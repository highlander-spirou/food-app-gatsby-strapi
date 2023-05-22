import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import RightDrawerLayout from "../components/RightDrawerLayout";
// import Modal from "../components/Modal";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* <Modal /> */}
      <Sidebar>
        <>
          <NavBar />
          <RightDrawerLayout children={children} />
        </>
      </Sidebar>
    </>
  );
};

export default Layout;
