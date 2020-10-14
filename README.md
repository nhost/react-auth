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
