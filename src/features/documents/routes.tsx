import { ReactComponent as IconDocuments } from '../../assets/icons/icon-documents.svg';
import { ReactComponent as IconDocumentsActive } from '../../assets/icons/icon-documents-active.svg';
import { LINK_TO_DASHBOARD } from '../../common/config/config';

export const documentsSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `${LINK_TO_DASHBOARD}documents`,
    label: 'Documents',
    icon: <IconDocuments />,
    iconActive: <IconDocumentsActive />,
  },
];
