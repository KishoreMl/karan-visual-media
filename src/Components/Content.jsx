import React from 'react';
import './Content.scss';

const Content = () => {
    return (
        <div className="content-container">
            {/* Background with stars */}
            <div className="stars-background"></div>
            
            {/* Header Section */}
            <div className="header-section">
                <h1 className="main-title">Accelerate performance</h1>
                <p className="main-description">
                    With GitHub Copilot embedded throughout the platform, you can simplify your toolchain, 
                    automate tasks, and improve the developer experience.
                </p>
            </div>

            {/* Central Card */}
            <div className="central-card">
                {/* Top Text Block */}
                <div className="text-block">
                    <h3 className="card-heading">The search functionality is now fully implemented. Users can:</h3>
                    <ol className="feature-list">
                        <li>Search for running races by name using the search box</li>
                        <li>See filtered results matching their search term</li>
                        <li>Navigate through paginated search results</li>
                        <li>The search term is preserved when navigating between pages</li>
                    </ol>
                    <p className="follow-up-question">
                        Is there anything specific about the implementation you'd like me to explain or would you like to update and run tests for validation?
                    </p>
                    
                    {/* Action Icons */}
                    <div className="action-icons">
                        <button className="icon-button">↻</button>
                        <button className="icon-button">👍</button>
                        <button className="icon-button">👎</button>
                    </div>
                </div>

                {/* File Changes Section */}
                <div className="file-changes-section">
                    <div className="file-changes-header">
                        <span className="files-changed">3 files changed</span>
                        <div className="file-actions">
                            <button className="keep-button">Keep</button>
                            <button className="undo-button">Undo</button>
                            <button className="file-icon-button">📄</button>
                        </div>
                    </div>
                    
                    <div className="file-list">
                        <div className="file-item">
                            <span className="file-icon ts-icon">TS</span>
                            <span className="file-path">race-service.ts src/lib/data</span>
                        </div>
                        <div className="file-item">
                            <span className="file-icon ts-icon">TS</span>
                            <span className="file-path">+page.server.ts src/routes</span>
                            <span className="add-icon">+</span>
                        </div>
                        <div className="file-item">
                            <span className="file-icon svelte-icon">S</span>
                            <span className="file-path">+page.svelte src/routes</span>
                            <span className="add-icon">+</span>
                        </div>
                    </div>
                </div>

                {/* Input Section */}
                <div className="input-section">
                    <button className="add-context-button">
                        <span className="plus-icon">+</span>
                        Add Context...
                    </button>
                    <input 
                        type="text" 
                        placeholder="Edit files in your workspace in agent mode"
                        className="workspace-input"
                    />
                    
                    {/* Bottom Control Bar */}
                    <div className="control-bar">
                        <button className="mic-button">🎤</button>
                        <select className="agent-dropdown">
                            <option>Agent</option>
                        </select>
                        <select className="model-dropdown">
                            <option>Claude 3.5 Sonnet</option>
                        </select>
                        <button className="play-button">▶</button>
                    </div>
                </div>
            </div>

            {/* Bottom Right Play Button */}
            <button className="bottom-play-button">▶</button>
        </div>
    );
};

export default Content;