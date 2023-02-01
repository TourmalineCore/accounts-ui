import {
  createContext, useState, useMemo, ReactNode, Dispatch, SetStateAction,
} from 'react';

  type ThemProviderStateProps = {
    isCreateAccount: boolean
    setIsCreateAccount: Dispatch<SetStateAction<boolean>>;
  };

const AccountContext = createContext<ThemProviderStateProps>({
  isCreateAccount: false,
  setIsCreateAccount: () => false,
});

function AccountProvider({
  initialColor = false,
  children,
}: {
  initialColor?: boolean;
  children?: ReactNode;
}) {
  const [isCreateAccount, setIsCreateAccount] = useState(initialColor);

  const value = useMemo(() => ({
    isCreateAccount,
    setIsCreateAccount,
  }), [isCreateAccount, setIsCreateAccount]);

  return (
    <AccountContext.Provider
      value={value}
    >
      <div>
        {children}
      </div>
    </AccountContext.Provider>
  );
}

export {
  AccountProvider,
  AccountContext,
};
