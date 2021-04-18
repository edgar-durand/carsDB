/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// reactstrap components
import {Container, Nav, NavItem, NavLink} from "reactstrap";
import i18n from "../../i18n";
import svg from '../../assets/img/wa.svg';

function Footer() {
    const {support, made, by, forA, text} = i18n[sessionStorage.getItem('locale') ?? i18n.default]['footer'];

    return (
        <footer className="footer">
            <Container fluid>
                <Nav>
                    {/*<NavItem>*/}
                    {/*    <NavLink href="https://www.creative-tim.com/?ref=bdr-user-archive-footer">*/}
                    {/*        Creative Tim*/}
                    {/*    </NavLink>*/}
                    {/*</NavItem>*/}
                    <NavItem>
                        {support}:
                        <NavLink href={`https://wa.me/+5355088452?text=${text}`}>
                            <img alt="12" src={svg} style={{width: "50px",marginRight: "7px"}} /> (+53) 55088452
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="mailto:edgarduranddiaz@gmail.com&subject=support">
                            <p className="text-lowercase"><i style={{fontSize: "30px",marginRight: "20px", marginLeft: "6px", color: "red"}} className="tim-icons icon-email-85"/> edgarduranddiaz@gmail.com</p>
                        </NavLink>
                    </NavItem>
                </Nav>
                <div className="copyright">
                    © {new Date().getFullYear()} {made}{" "}
                    <i style={{fontSize: "30px",marginRight: "2px", marginLeft: "2px", color: "red"}} className="tim-icons icon-heart-2"/> {by}{" "}
                    <a
                        href="https://linkedin.com/in/edgar-durand"
                        target="_blank"
                    >
                        Edgar 3D.
                    </a>{" "}
                    {forA}
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
