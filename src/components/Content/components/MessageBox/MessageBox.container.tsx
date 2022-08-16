import { useContentContext } from "../../utils/context";
import MessageBoxView from "./MessageBox.view";
import { MessageBoxContext } from "./utils/context";

export default function MessageBoxContainer() {
  const {messages} = useContentContext()
  return (
    <MessageBoxContext.Provider value={{messages}}>
      <MessageBoxView />
    </MessageBoxContext.Provider>
  );
}
