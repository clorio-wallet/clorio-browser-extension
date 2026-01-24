/**
 * Transformer to filter paths and set operationIds
 * @param {import('openapi-types').OpenAPI.Document} schema
 */
module.exports = (schema) => {
  const mapping = {
    '/v1/mina/accounts/:address': {
      operationId: 'getAccount',
      parameters: [{
        name: 'address',
        in: 'path',
        required: true,
        schema: { type: 'string' }
      }]
    },
    '/v1/ticker/': { operationId: 'getTicker' },
    '/v1/mina/info/': { operationId: 'getMinaInfo' },
    '/v1/health/': { operationId: 'getHealth' }
  };

  const newPaths = {};
  const components = schema.components || {};
  components.schemas = components.schemas || {};

  Object.entries(mapping).forEach(([path, config]) => {
    if (schema.paths[path]) {
      // Convert :param to {param} for OpenAPI compliance
      const openApiPath = path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
      
      newPaths[openApiPath] = { ...schema.paths[path] }; // Shallow copy path item
      
      // Inject operationId and parameters for GET method
      if (newPaths[openApiPath].get) {
        newPaths[openApiPath].get = { ...newPaths[openApiPath].get }; // Shallow copy operation
        newPaths[openApiPath].get.operationId = config.operationId;
        
        if (config.parameters) {
          newPaths[openApiPath].get.parameters = [
            ...(newPaths[openApiPath].get.parameters || []),
            ...config.parameters
          ];
        }

        // Extract Response Schema to rename it
        if (newPaths[openApiPath].get.responses && newPaths[openApiPath].get.responses['200']) {
           const response200 = { ...newPaths[openApiPath].get.responses['200'] };
           if (response200.content && response200.content['application/json'] && response200.content['application/json'].schema) {
             const schemaName = config.operationId.charAt(0).toUpperCase() + config.operationId.slice(1);
             
             // Move schema to components
             components.schemas[schemaName] = response200.content['application/json'].schema;
             
             // Update response to use $ref
             response200.content = { 
               ...response200.content,
               'application/json': {
                 schema: { $ref: `#/components/schemas/${schemaName}` }
               }
             };
             
             newPaths[openApiPath].get.responses = {
               ...newPaths[openApiPath].get.responses,
               '200': response200
             };
           }
        }
      }
    }
  });

  return {
    ...schema,
    components,
    paths: newPaths
  };
};
