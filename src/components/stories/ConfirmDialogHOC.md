# Description

An HOC which takes as input a component and returns a new component with a new prop injected within:

- *confirmDialog: (message: ConfirmDialogOptions) => void;* - Show a confirm dialog with the options you provided in the given message

The message parameter is an object with the following properties:

- *content: ReactNode;* - The content of the message to be displayed
- *onConfirm: () => void;* - A callback triggered when the confirm button has been clicked
- *title?: ReactNode;* - Optional. The title of the confirm dialog

```jsx
class SampleConfirmDialogHOC extends PureComponent<Props> {
  render(): ReactNode {
    const { confirmDialog } = this.props;

    return (
      <Button
        color="secondary"
        onClick={() => {
          confirmDialog({
            content: <div>content</div>,
            title: <div>title</div>,
            onConfirm: () => {
              // called when confirm button has been clicked
            },
          });
        }}
      >
          SHOW
      </Button>
    );
  }
}
const WithConfirmDialogComp = withConfirmDialog(SampleConfirmDialogHOC);
```