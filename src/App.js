import { ConfigProvider } from "antd";
import './App.css';
import { GlobalContext } from './components/context/GlobalContext';
import TablaReportes from "./components/ui/TablaReportes";
import { useState } from 'react';
import esES from "antd/lib/locale/es_ES";

console.log('version modulo-reportes 15.04.24.2')

function App() {
  return (
    <GlobalContext.Provider value={{  }} >
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            colorPrimary: "#56b43c",
          },
        }}
      >
        <TablaReportes />
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default App;
