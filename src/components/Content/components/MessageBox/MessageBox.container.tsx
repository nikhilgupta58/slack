import { useContentContext } from "../../utils/context";
import MessageBoxView from "./MessageBox.view";
import { MessageBoxContext } from "./utils/context";

export default function MessageBoxContainer() {
  const {messages,userData} = useContentContext()
  return (
    <MessageBoxContext.Provider value={{messages,userData}}>
      <MessageBoxView />
    </MessageBoxContext.Provider>
  );
}
