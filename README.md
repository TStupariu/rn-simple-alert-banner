#rn-simple-alert-banner

This is a simple component I built that used to display banners in React Native applications.

DISCLAIMER: It should work on iOS/Android, but it's mostly tested on iOS.

Install:

```npm i --save rn-simple-alert-banner```

No linking required since no native bridges are used.

Usage Exmaples:

App.js
```
import {MessageBanner, MessageManager} from 'rn-simple-alert-banner';

const App = () => {
  let messageRef = useRef(null)
  if (messageRef) {
    MessageManager.init(messageRef)
  }

  return (
    <MessageBanner ref={messageRef}>
      <SafeAreaView>
        <MyComponent/>
      </SafeAreaView>
    </MessageBanner>
  )
}

export default App;
```

MyComponent.js
```
import {MessageManager} from 'rn-simple-alert-banner';

const MyComponent = () => {
  const config = {
    backgroundColor: 'green',
    color: 'white',
    text: 'My text from another dimension!',
    Icon: () => <View style={{height: 20, width: 20, backgroundColor: 'yellow'}}/>,
  }

  const compConfig = {
    Component: () => <View style={{height: 80, backgroundColor: 'blue'}}/>,
    timeout: 5000
  }

  return (
    <View>
      <Text>My Component</Text>
      <Button onPress={() => MessageManager.show(config)} title={'Show!'} />
    </View>
  );
};

export default MyComponent;
```

The show config can take the following shape:

```
For the default styling adjustments:

backgroundColor: string
color: string
text: string
Icon: React Component (function)

For a completely custom component:

Component: React Component (function)

General props:

timeout: number (nr. of milliseconds until it dissapears)

``` 

NOTE: If you provide a Component property then the default styling for the banner will be ignored and only your component will be rendered.

The messageManager exposes 3 functions, init, shoe and hide, allowing you to programatically control the message bar component from the outside.
