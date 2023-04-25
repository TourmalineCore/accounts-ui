/// <reference types="cypress" />

import '@tourmalinecore/react-tc-ui-kit/es/index.css';
import '@tourmalinecore/react-tc-modal/es/index.css';
import '@tourmalinecore/react-table-responsive/es/index.css';
import 'react-toastify/ReactToastify.min.css';

import '../../src/styles/index.scss';
import './commands';

import '../env-config';

import { ReactNode } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import { MountReturn, mount, MountOptions } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}

Cypress.Commands.add('mount', (component, options: MountOptions & { routerProps?: MemoryRouterProps } = {}) => {
  const {
    routerProps = {
      initialEntries: ['/'],
    },
    ...mountOptions
  } = options;

  const wrapped = (
    <MemoryRouter {...routerProps}>
      {component}
    </MemoryRouter>
  );

  return mount(wrapped, mountOptions);
});
