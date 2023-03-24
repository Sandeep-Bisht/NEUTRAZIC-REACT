import React from "react";
import Header1 from "./Header1";
import Footer from "./Footer";
import "../components/AppstoreNutrazik.css";
import { Link } from "react-router-dom";

const AppStoreNutrazik = () => {
    return (
        <>
            <Header1 />
            <section className="Appstore-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>App will be available soon.....</h1>
                            <Link to="/AllProducts"><button className="Appstore-Button">Continue Shopping With Us.....</button></Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default AppStoreNutrazik;