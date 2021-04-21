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
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    InputGroup,
    NavbarBrand,
    Navbar,
    NavLink,
    Nav,
    Container,
    Modal,
    NavbarToggler,
    ModalHeader,
} from "reactstrap";
import i18n from "../../i18n";
import {Link} from "react-router-dom";

function AdminNavbar(props) {
    const [collapseOpen, setcollapseOpen] = React.useState(false);
    const [modalSearch, setmodalSearch] = React.useState(false);
    const [color, setcolor] = React.useState("navbar-transparent");
    React.useEffect(() => {
        window.addEventListener("resize", updateColor);
        // Specify how to clean up after this effect:
        return function cleanup() {
            window.removeEventListener("resize", updateColor);
        };
    });
    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    const updateColor = () => {
        if (window.innerWidth < 993 && collapseOpen) {
            setcolor("bg-white");
        } else {
            setcolor("navbar-transparent");
        }
    };
    // this function opens and closes the collapse on small devices
    const toggleCollapse = () => {
        if (collapseOpen) {
            setcolor("navbar-transparent");
        } else {
            setcolor("bg-white");
        }
        setcollapseOpen(!collapseOpen);
    };
    // this function is to open the Search modal
    const toggleModalSearch = () => {
        setmodalSearch(!modalSearch);
    };
    // const handleClose = ()=>{
    //     props.handleSearch();
    //     sessionStorage.removeItem('search');
    // };
    const {lang} = props;
    const search = i18n._language('header.search');
    const account = i18n._language('header.account', {name: "Username"});

    const profile = i18n._language('header.title.user-profile');
    const {logOut} = sessionStorage.getItem('locale') ? JSON.parse(sessionStorage.getItem(sessionStorage.getItem('locale')))['header']['dropDown'] : i18n[lang]['header']['dropDown'];
    return (
        <>
            <Navbar className={classNames("navbar-absolute", color)} expand="lg">
                <Container fluid>
                    <div className="navbar-wrapper">
                        <div
                            className={classNames("navbar-toggle d-inline", {
                                toggled: props.sidebarOpened,
                            })}
                        >
                            <NavbarToggler onClick={props.toggleSidebar}>
                                <span className="navbar-toggler-bar bar1"/>
                                <span className="navbar-toggler-bar bar2"/>
                                <span className="navbar-toggler-bar bar3"/>
                            </NavbarToggler>
                        </div>
                        <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                            {props.brandText}
                        </NavbarBrand>
                    </div>
                    <NavbarToggler onClick={toggleCollapse}>
                        <span className="navbar-toggler-bar navbar-kebab"/>
                        <span className="navbar-toggler-bar navbar-kebab"/>
                        <span className="navbar-toggler-bar navbar-kebab"/>
                    </NavbarToggler>
                    <Collapse navbar isOpen={collapseOpen}>
                        <Nav className="ml-auto" navbar>
                            <InputGroup className="search-bar">
                                <Button color="link" onClick={toggleModalSearch}>
                                    <Link to={"/admin/tables"}><i className="tim-icons icon-zoom-split"/>
                                        <span className="d-lg-none d-md-block">{search}</span></Link>
                                </Button>
                            </InputGroup>
                            {/*<UncontrolledDropdown nav>*/}
                            {/*    <DropdownToggle*/}
                            {/*        caret*/}
                            {/*        color="default"*/}
                            {/*        data-toggle="dropdown"*/}
                            {/*        nav*/}
                            {/*    >*/}
                            {/*        <div className="notification d-none d-lg-block d-xl-block"/>*/}
                            {/*        <i className="tim-icons icon-bell-55"/>*/}
                            {/*        <p className="d-lg-none">{notifications}</p>*/}
                            {/*    </DropdownToggle>*/}
                            {/*    <DropdownMenu className="dropdown-navbar" right tag="ul">*/}
                            {/*        <NavLink tag="li">*/}
                            {/*            <DropdownItem className="nav-item">*/}
                            {/*                Mike John responded to your email*/}
                            {/*            </DropdownItem>*/}
                            {/*        </NavLink>*/}
                            {/*        <NavLink tag="li">*/}
                            {/*            <DropdownItem className="nav-item">*/}
                            {/*                You have 5 more tasks*/}
                            {/*            </DropdownItem>*/}
                            {/*        </NavLink>*/}
                            {/*        <NavLink tag="li">*/}
                            {/*            <DropdownItem className="nav-item">*/}
                            {/*                Your friend Michael is in town*/}
                            {/*            </DropdownItem>*/}
                            {/*        </NavLink>*/}
                            {/*        <NavLink tag="li">*/}
                            {/*            <DropdownItem className="nav-item">*/}
                            {/*                Another notification*/}
                            {/*            </DropdownItem>*/}
                            {/*        </NavLink>*/}
                            {/*        <NavLink tag="li">*/}
                            {/*            <DropdownItem className="nav-item">*/}
                            {/*                Another one*/}
                            {/*            </DropdownItem>*/}
                            {/*        </NavLink>*/}
                            {/*    </DropdownMenu>*/}
                            {/*</UncontrolledDropdown>*/}
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    caret
                                    color="default"
                                    nav
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <div className="photo">
                                        <img
                                            alt="..."
                                            src={require("assets/img/anime3.png").default}
                                        />
                                    </div>
                                    <b className="caret d-none d-lg-block d-xl-block"/>
                                    <p className="d-lg-none">{account}</p>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-navbar" right tag="ul">
                                    <NavLink tag="li">
                                        <DropdownItem className="nav-item">{profile}</DropdownItem>
                                    </NavLink>
                                    <NavLink tag="li">
                                        <DropdownItem className="nav-item">{logOut}</DropdownItem>
                                    </NavLink>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <li className="separator d-lg-none"/>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            <Modal
                modalClassName="modal-search"
                isOpen={modalSearch}
                toggle={toggleModalSearch}
                // onClosed={() => handleClose()}
            >
                <ModalHeader>
                    <input className="form-control" placeholder={search.toUpperCase()}
                           autoFocus={true}
                           defaultValue={sessionStorage.getItem('search')?sessionStorage.getItem('search'):null}
                           onChange={(event) => props.handleSearch(event.target.value)} type="text"/>
                    <button
                        aria-label="Close"
                        className="close"
                        onClick={toggleModalSearch}
                    >
                        <i className="tim-icons icon-simple-remove"/>
                    </button>
                </ModalHeader>
            </Modal>
        </>
    );
}

export default AdminNavbar;
