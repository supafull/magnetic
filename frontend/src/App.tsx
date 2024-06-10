import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import {
  ForgotPasswordPage,
  LoginPage,
  SetPasswordPage,
  raSupabaseEnglishMessages,
} from "ra-supabase";
import { createContext, useEffect, useState } from "react";
import {
  Admin,
  CustomRoutes,
  ListGuesser,
  Resource,
  defaultTheme,
  mergeTranslations,
} from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Layout from "./Layout";
import { authProvider } from "./authProvider";
import companies from "./companies";
import contacts from "./contacts";
import { Dashboard } from "./dashboard/Dashboard";
import { dataProvider } from "./dataProvider";
import deals from "./deals";
import { electric } from "./ra-data-electric";
import { supabase } from "./supabase";

export const MessageContext = createContext<{
  message: string;
}>({
  message: "",
});

const i18nProvider = polyglotI18nProvider(() => {
  return mergeTranslations(englishMessages, raSupabaseEnglishMessages);
}, "en");

export default function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // NOTE: This is a simple example of how to subscribe to changes in the database
    // This example is a little silly, you would be much better using
    // an electric live query when you are managing electrified tables!
    supabase
      .channel("changes:public:*")
      .on("postgres_changes", { event: "*", schema: "public" }, handleDBChange)
      .subscribe((status, err) =>
        console.debug("Changes subscribe status: ", status, err)
      );
  }, []);
  async function handleDBChange(payload: any) {
    if (payload.eventType === "INSERT" && payload.table === "deals") {
      const sales = await electric.db.sales.findUnique({
        where: { id: payload.new.sales_id },
      });
      setMessage(`New deal for ${sales?.first_name} ${sales?.last_name}!`);
      setTimeout(() => setMessage(""), 10_000);
    }
  }

  return (
    <BrowserRouter>
      <MessageContext.Provider value={{ message }}>
        <Admin
          dataProvider={dataProvider}
          authProvider={authProvider}
          i18nProvider={i18nProvider}
          layout={Layout}
          dashboard={Dashboard}
          loginPage={LoginPage}
          theme={{
            ...defaultTheme,
            palette: {
              background: {
                default: "#fafafb",
              },
            },
          }}
        >
          <CustomRoutes noLayout>
            <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
            <Route
              path={ForgotPasswordPage.path}
              element={<ForgotPasswordPage />}
            />
          </CustomRoutes>
          <Resource name="deals" {...deals} />
          <Resource name="contacts" {...contacts} />
          <Resource name="companies" {...companies} />
          <Resource name="tasks" list={ListGuesser} />
          <Resource name="sales" list={ListGuesser} />
          <Resource name="tags" list={ListGuesser} />
        </Admin>
      </MessageContext.Provider>
    </BrowserRouter>
  );
}
