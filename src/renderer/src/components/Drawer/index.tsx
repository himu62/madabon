import { Link } from "react-router";

interface Props {
  opened: boolean;
}

const Drawer = ({ opened }: Props) => {
  return (
    <div>
      <h1>Drawer</h1>
      {opened ? "Opened" : "Closed"}
      <Link to="/">Home</Link>
      <Link to="/versions">Versions</Link>
    </div>
  );
};
export default Drawer;
