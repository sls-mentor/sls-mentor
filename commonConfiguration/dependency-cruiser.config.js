/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment:
        'This dependency is part of a circular relationship. You might want to revise ' +
        'your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-provisioning-in-application',
      severity: 'error',
      comment:
        'Please do not import provisioning code in your application code.',
      from: {
        path: '^functions',
        pathNot: ['^functions.+config', '^functions/index'],
      },
      to: { path: '^resources|^functions.+config' },
    },
    {
      name: 'no-application-in-provisioning',
      severity: 'error',
      comment:
        'Please do not import application code in your provisioning code.',
      from: { path: '^resources|^functions.+config' },
      to: {
        // you can remove contracts if you only use shared contracts
        pathNot: '^resources|^functions.+config|^contracts|^shared|^path',
      },
    },
  ],
  options: {
    exclude: {
      path: ['cdk.out', 'node_modules', 'dist'],
    },
    tsPreCompilationDeps: true,
    tsConfig: {},
  },
};
