export const MODULE_PATHS = [
  {
    selector: 'module-one',
    loadChildren: () =>
      import('../../../app/module1/module1.module').then(
        (m) => m.Module1Module
      ),
  },
  {
    selector: 'module-two',
    loadChildren: () =>
      import('../../../app/module2/module2.module').then(
        (m) => m.Module2Module
      ),
  },
];
