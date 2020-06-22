// React
import React from "react";
import { Link } from "react-router-dom";
import ImageBudget from "../../images/budget.jpg";
import ImageChart from "../../images/bar-chart.png";
import ImageItems from "../../images/groceries.jpg";

// Configuration
import "./LandingPage.css";

export default function LandingPage() {
    return (
        <section id='LandingPage' className='route_page'>
            <section>
                <h3>Start keeping track</h3>
                <img
                    className='landing_image'
                    src={ImageItems}
                    alt='basket of colorful vegetables sitting on dark surface'
                />
                <p>
                    How do you spend your money? Most people can think of big
                    items like rent and car payments, but then it starts to get
                    fuzzy. Did I buy pizza this week or last week? How much did
                    I spend on groceries? Expense Tracker aims to help people
                    track their spending by making it easy to add an expense and
                    quickly see where money is being spent by category.
                </p>
            </section>

            <section>
                <h3>Start using a budget</h3>
                <img
                    className='landing_image'
                    src={ImageBudget}
                    alt='budget and tracking documents on table with pen and bowl of paperclips'
                />
                <p>
                    Once you know where your money is being spent, you can
                    figure out how you should spend it in the future. Expense
                    Tracker can help you set a budget and keep your spending
                    focused on the things you want.
                </p>
            </section>

            <section>
                <h3>Start learning</h3>
                <img
                    className='landing_image'
                    src={ImageChart}
                    alt='horizontal bar chart showing budget category spending vs. category budget amount'
                />
                <p>
                    Expense Tracker will use your financial history to show you
                    monthly, annual, and lifetime spending. Use this information
                    to help guide your spending in the future.
                </p>
            </section>

            <section>
                <Link to='/register'>
                    <h3 className='landing_link'>
                        Sign up for Expense Tracker
                    </h3>
                </Link>
                <Link to='/demo'>
                    <h3 className='landing_link'>Try the Demo</h3>
                </Link>
            </section>
        </section>
    );
}
