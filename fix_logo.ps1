Add-Type -AssemblyName System.Drawing
$srcPath = Join-Path $PSScriptRoot "assets\icons\logo.png"
if (-not (Test-Path $srcPath)) {
    Write-Error "Source PNG not found at $srcPath"
    exit 1
}

try {
    # 1. Load the original PNG (which has white background)
    $original = [System.Drawing.Bitmap]::FromFile($srcPath)
    
    # 2. Create a new Bitmap that supports Alpha (Format32bppArgb)
    $bmp = New-Object System.Drawing.Bitmap($original.Width, $original.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # 3. Draw the original image onto the new bitmap
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($original, 0, 0, $original.Width, $original.Height)
    $g.Dispose()
    $original.Dispose() # Release file lock on original as soon as possible

    # 4. Iterate and update white pixels to transparent
    for ($y=0; $y -lt $bmp.Height; $y++) {
        for ($x=0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            # Threshold for "white" - aggressive (245) to catch compression artifacts
            if ($c.R -ge 245 -and $c.G -ge 245 -and $c.B -ge 245) {
                # Force full transparency
                $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            }
        }
    }
    
    # 5. Save the modified image back to the same file
    if (Test-Path $srcPath) { Remove-Item $srcPath -Force }
    $bmp.Save($srcPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    Write-Host "Updated logo.png with transparency"
    
    # 6. Update the SVG to embed the new transparent PNG
    $bytes = [System.IO.File]::ReadAllBytes($srcPath)
    $b64 = [Convert]::ToBase64String($bytes)
    $svgPath = Join-Path $PSScriptRoot "assets\icons\logo.svg"
    
    $svgContent = @"
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1147 1126' width='1147' height='1126'>
  <image href='data:image/png;base64,$b64' width='1147' height='1126'/>
</svg>
"@
    [System.IO.File]::WriteAllText($svgPath, $svgContent, [System.Text.Encoding]::UTF8)
    $bmp.Dispose()

    Write-Host "Updated logo.svg with embedded transparent PNG"
    
} catch {
    Write-Error "Error processing image: $_"
    if ($original) { $original.Dispose() }
    if ($bmp) { $bmp.Dispose() }
}