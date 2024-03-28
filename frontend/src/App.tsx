import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import {
  ForgotPasswordPage,
  LoginPage,
  SetPasswordPage,
  raSupabaseEnglishMessages,
} from "ra-supabase";
import {
  Admin,
  CustomRoutes,
  ListGuesser,
  Resource,
  defaultTheme,
  mergeTranslations,
} from "react-admin";
import { QueryClient } from "react-query";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "./Layout";
import { authProvider } from "./authProvider";
import companies from "./companies";
import contacts from "./contacts";
import { Dashboard } from "./dashboard/Dashboard";
import { dataProvider } from "./dataProvider";
import deals from "./deals";

const queryClient = new QueryClient();
const i18nProvider = polyglotI18nProvider(() => {
  return mergeTranslations(englishMessages, raSupabaseEnglishMessages);
}, "en");

const App = () => (
  <BrowserRouter>
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      layout={Layout}
      dashboard={Dashboard}
      loginPage={LoginPage}
      queryClient={queryClient}
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
  </BrowserRouter>
);

export default App;
