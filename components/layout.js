import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = (props) => (
            <div>
                <Head>
                    <title>Ticket Booking</title>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"></meta>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <link rel="stylesheet" href="../static/styles/styles.css"/>
                    <link rel="stylesheet" href="../static/styles/style.css"/>
                    <link rel="stylesheet" href="../static/styles/react-datepicker.css"/>
                    {/* <link href="https://fonts.googleapis.com/css?family=Lato|Open+Sans&display=swap" rel="stylesheet"></link> */}
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
                </Head>
                <Header/>
                {props.children}
                <Footer/>
            </div>
);

export default Layout;