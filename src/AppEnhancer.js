import React from "react";
import { ProvideAuth } from "./Hooks/useFirebase";
import { ProvideUi } from "./Context/useUiReducer";
const AppEnhancer = Comp => {
  return () => (
    <ProvideAuth>
      <ProvideUi>
        <Comp />
      </ProvideUi>
    </ProvideAuth>
  );
};

export default AppEnhancer;
