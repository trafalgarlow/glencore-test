# Description

An HOC which takes as input a component and returns a new component with the following new props injected within:

- *show: (message: ToastMessageOptions) => void;* - Show a toast message with the options you provided in the given message
- *hide: () => void;* - Hide the toast message

The message parameter is an object with the following properties:

- *content: ReactNode;* - The content of the message to be displayed
- *autoHideDuration?: number;* - Optional. The time after whose value the toast should be closed automatically
- *position?: SnackbarOrigin;* - Optional. The position of the toast message to be displayed. Accepts the following values:
  - *verticdl: 'top' | 'bottom';* - Y position
  - *horizontal: 'left' | 'center' | 'right';* - X position

```jsx
class SampleToastMessageHOC extends PureComponent<WithToastMessageProps> {
  onShow = (): void => {
    const { show } = this.props;
    show({ content: <div>message content</div>, position: { vertical: 'top', horizontal: 'right' } });
  };

  render(): ReactNode {
    const { hide } = this.props;

    return (
      <div>
        <Button color="secondary" onClick={this.onShow}>SHOW TOAST MESSAGE</Button>
        <Button color="secondary" onClick={hide}>HIDE</Button>
      </div>
    );
  }
}
const WithToastMessageComp = withToastMessage(SampleToastMessageHOC);
```