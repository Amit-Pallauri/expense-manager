import React from 'react'
import '../styles/homepage.css'

const HomePage = () => {
    return (
            <div className="homePage-container">
                <main class="measure center tc sans-serif black-80 absolute absolute--fill">
                   <div class="flex flex-column justify-center items-center h-100">
                    <header>
                        <h1 class="animated fadeInUp ease-out-circ d2 a-1 f2 fw3">
                        <code class="db black-40" style={{ width : '500px' }}>'Welcome To X-pense'</code>
                        </h1>
                        <h2 class="animated fadeInUp ease-out-circ d-1 a-2 f6">
                            Register yourself to enjoy <span class="nowrap">our services</span>
                        </h2>
                    </header>
                    </div>
                </main>
            </div>
        )
}

export default HomePage
