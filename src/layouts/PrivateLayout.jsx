import NavbarLogged from "../components/shared/NavbarLogged";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <NavbarLogged />
      <div className="container py-4">
        {children}
      </div>
    </>
  );
};

export default PrivateLayout;
