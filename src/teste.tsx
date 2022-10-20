import { useState } from "react";

type TitleProps = {
    text: string;
};

const Title = ({ text}: TitleProps) => {
  return <h1>{text}</h1>;
};

function Teste() {
  const [count, setCount] = useState(0);

  return <p>ioi</p>;
}

export default Teste;
