import {useState} from "react";

const useDisclosure = (defaultValue = false) => {
  const [show, setShow] = useState(defaultValue);

  const onShow = () => setShow(true);

  const onClose = () => setShow(false);

  const onToggle = () => setShow((prev) => !prev);

  return [show, {onShow, onClose, onToggle}] as const;
};

export default useDisclosure;
