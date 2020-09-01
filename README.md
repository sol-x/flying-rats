## Instructions

This test shouldn't take more than 60 minutes (even with the bonus section). If you don't want to finish it then submit what you have done after 60 minutes.

Please do not fork this repo on github or open a pull request. Submit your solution via email in an archive, which can be created with the following git command:

```
git archive HEAD . -o solution.tar
```

To run this test type:

```typescript
yarn install
yarn start
```

The entry point to react can be found at [client/src/App.tsx](client/src/App.tsx).

The react app should do three things:

1. Show a `<select>` which shows each of the rat names retrievable by `http://localhost:7421/rat-names`. In addition to the names of the rats, the first entry in the `<select>` should be `No Rat`.
2. `No Rat` should be selected by default.
3. When `No Rat` is selected only the `<select>` should be visible.
4. When a rat name is selected the `width`, `height` and `nickname` of the rat should also be shown. This information can be retrieved from `http://localhost:7421/rat/${nameOfRat}`. Not all rats have a nickname, for rats that have no nickname the nickname should be listed as "Uncool Rat with no Nickname".
5. For large screens the app should be as tall as the browser window and the select should be to the left of the rat information. For narrow screens the rat information should be below the select

## Bonus Round

It should be possible to complete this app in much less than 60 minutes, please spend the remaining time implementing unit tests with [react-testing-library](https://github.com/testing-library/react-testing-library).

## Help

The following commands show examples of how to use the API with curl:

```bash
% curl http://localhost:7421/rat-names
["dervin","moss boss","catherine","kevin","susan","The Mode"]

% curl http://localhost:7421/rat/susan
{"width":20,"height":18,"nickname":"La King"}
```

## Rules

1. You can add any libraries you want, e.g. `redux`, `axios`, `mobx`, `redux-saga`, `redux-observable`, `reselect`, `typesafe-actions`, `unionize` or anything else you'd like to use.
2. You don't have to use any libraries if you don't want to.
3. You don't have to use a state management library, you can use `useEffect` to retrieve the data if you'd like.
4. Please don't change `client/tsconfig.json` or any of the code in the `server` directory.
5. We'd prefer to see this done only using hooks and functional components, but feel free to use class components if you'd prefer.
