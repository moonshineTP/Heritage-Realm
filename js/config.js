// Handles loading and parsing flow.yaml
const ConfigLoader = {
    async load() {
        try {
            const response = await fetch('flow.yaml');
            const yamlText = await response.text();
            // Requires js-yaml library loaded via CDN in index.html
            return jsyaml.load(yamlText);
        } catch (error) {
            console.error("Failed to load flow.yaml", error);
            return null;
        }
    }
};
