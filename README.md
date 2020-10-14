# React Nhost

Make it easy to use Nhost with React and Auth.

- `NhostAuthProvider` - AuthProvider to check logged-in state.

> This package works well with [`@nhost/react-apollo`](https://github.com/nhost/react-apollo).

## Install

```bash
npm install @nhsot/react-auth
```

### Create React App

Add `NhostAuthProvider`

`src/index.js`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { NhostAuthProvider } from "@nhost/react-auth";
import { auth } from "utils/nhost.js";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <NhostAuthProvider auth={auth}>
      <App />
    </NhostAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

`src/utils/nhost.js`

Learn more about `auth` and `storage` in the [nhost-js-sdk](https://github.com/nhost/nhost-js-sdk) repository.

```js
import nhost from "nhost-js-sdk";

const config = {
  base_url: "https://backend-xxx.nhost.app",
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };
```

**Auth**

```jsx
import React from "react";
import { useAuth } from "@nhost/react-auth";

export MyComponent() {
  const { signedIn } = useAuth();

  if (!signedIn) {
    return (
      <div>You are not signed in.</div>;
    );
  }

  return (
    <div>You are signed in 🎉!</div>
  );
}
```

## Protected Routes

### React Router

`src/components/privateroute.jsx`

```jsx
export function AuthGate({ children, ...rest }) {
  const { signedIn } = useAuth();

  if (signedIn === null) {
    return <div>Loading...</div>;
  }

  if (!signedIn) {
    return <Redirect to="/login" />;
  }

  // user is logged in
  return children;
}
```

#### Usage

```jsx
import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthGate } from "components/auth-gate";

<Router>
  <Switch>
    /* Unprotected routes */
    <Route exact path="/register">
      <Register />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
  </Switch>
  /* Protected routes */
  <AuthGate>
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
    </Switch>
  </AuthGate>
</Router>;
```

---

### NextJS

`components/privateroute.jsx`

```jsx
import { useAuth } from "react-nhost";

export function privateRoute(Component) {
  return () => {
    const { signedIn } = useAuth();

    // wait to see if the user is logged in or not.
    if (signedIn === null) {
      return <div>Checking auth...</div>;
    }

    if (!signedIn) {
      return <div>Login form or redirect to `/login`.</div>;
    }

    return <Component {...arguments} />;
  };
}
```

#### Usage

`pages/dashboard.jsx`

```jsx
import React from "react";
import { protectRoute } from "components/privateroute.jsx";

function Dashboard(props) {
  return <div>My dashboard</div>;
}

export default privateRoute(Dashboard);
```
