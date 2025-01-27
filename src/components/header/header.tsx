import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  HeaderContainer,
  HamburgerButton,
  ActionButtons,
  SlidingMenu,
} from "./styles";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleChangePage = (path:string) =>{
    router.push(path)
  }
  return (
    <HeaderContainer>
      <HamburgerButton onClick={toggleMenu} aria-label="Menu">
        <div></div>
        <div></div>
        <div></div>
      </HamburgerButton>

      <ActionButtons>
        {!isAuthenticated ? (
          <>
            <a onClick={()=>handleChangePage("/login")}>Login</a>
            <a onClick={()=>handleChangePage("/register")} className="register">
              Register
            </a>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </ActionButtons>

      <SlidingMenu isOpen={isMenuOpen}>
        <button className="close" onClick={toggleMenu}>
          ×
        </button>
        <ul>
          {!isAuthenticated ? (
            <>
              <li>
                <a onClick={()=>handleChangePage("/")}>Landing</a>
              </li>
              <li>
                <a onClick={()=>handleChangePage("/login")}>Login</a>
              </li>
              <li>
                <a onClick={()=>handleChangePage("/register")}>Register</a>
              </li>
              <li>
                <a onClick={()=>handleChangePage("/discoverTheNew")} >Discover the New</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a onClick={()=>handleChangePage("/")}>Landing</a>
              </li>
              <li>
                <a onClick={()=>handleChangePage("/discoverTheNew")}>Discover the New</a>
              </li>
              <li>
                <a onClick={()=>handleChangePage("/categoryAndGenre")}>Create genres and categories</a>
              </li>
              <li>
                <a onClick={()=>handleChangePage("/createAudioBook")}>Create Audio Book</a>
              </li>
            </>
          )}
        </ul>
        <div className="footer">
          <a href="/privacy">Privacy</a>
          <a href="/policy">Policy</a>
        </div>
      </SlidingMenu>
    </HeaderContainer>
  );
};

export default Header;
