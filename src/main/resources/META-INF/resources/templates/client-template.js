const ClientTemplate = `
<div>
    <section class="pf-c-page__main-section pf-m-light">
        <div class="pf-l-split pf-m-gutter">
            <div class="pf-l-split__item">
                <div class="pf-c-content">
                    <h1>Client</h1>
                </div>
            </div>
            <div class="pf-l-split__item pf-m-fill"></div>
            <div class="pf-l-split__item pf-c-form pf-m-horizontal">
                <div class="pf-c-form__group no-space" style="display: block;">
                    <div class="pf-c-form__group-label">
                        <label class="pf-c-form__label">
                            <span class="pf-c-form__label-text">Brokers:</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="pf-l-split__item">
                <div class="pf-c-dropdown pf-m-expanded">
                    <button class="pf-c-dropdown__toggle" type="button" id="dropdown-broker" aria-expanded="true" v-on:click="onDropDownBroker">
                        <span class="pf-c-dropdown__toggle-text">{{selectedBroker}}</span>
                        <i class="fas fa-caret-down pf-c-dropdown__toggle-icon" aria-hidden="true"></i>
                    </button>
                    <ul class="pf-c-dropdown__menu pf-m-align-right" aria-labelledby="dropdown-expanded-button" v-show="bootstrapShow">
                        <li v-for="broker in brokerList" :key="broker">
                            <button class="pf-c-dropdown__menu-item" type="submit" v-on:click="onSelectBroker(broker)">{{broker}}</button>
                        </li>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pf-l-split__item pf-c-form pf-m-horizontal">
                <div class="pf-c-form__group-label">
                    <label class="pf-c-form__label" for="filter">
                        <span class="pf-c-form__label-text">Filter:</span>
                    </label>
                </div>
                <div class="pf-c-form__group-control">
                    <input v-model="filter" class="pf-c-form-control" type="text" id="filter" name="filter" required />
                </div>
            </div>
            <div class="pf-l-split__item pf-c-form pf-m-horizontal">
                <div class="pf-c-form__group no-space" style="display: block;">
                    <div class="pf-c-form__group-label">
                        <label class="pf-c-form__label">
                            <span class="pf-c-form__label-text">Messages:</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="pf-l-split__item">
                <div class="pf-c-dropdown pf-m-expanded">
                    <button class="pf-c-dropdown__toggle" type="button" id="dropdown-limit" aria-expanded="true" v-on:click="onDropDownLimit">
                        <span class="pf-c-dropdown__toggle-text">{{selectedLimit}}</span>
                        <i class="fas fa-caret-down pf-c-dropdown__toggle-icon" aria-hidden="true"></i>
                    </button>
                    <ul class="pf-c-dropdown__menu pf-m-align-right" aria-labelledby="dropdown-expanded-button" v-show="limitShow">
                        <li v-for="limit in limits" :key="limit">
                            <button class="pf-c-dropdown__menu-item" type="submit" v-on:click="onSelectLimit(limit)">{{limit}}</button>
                        </li>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pf-l-split__item">
                <button class="pf-c-button" type="submit" v-on:click="onReconnect">
                    <span class="pf-c-button__icon">
                        <i class="fas fa-sync" aria-hidden="true"></i>
                    </span>
                    <span class="pf-c-button__text">Reconnect</span>
                </button>
            </div>
        </div>
    </section>
    <div v-if="tab === 'message' && message != null">
        {#include message.html /}
    </div>
    <section v-show="tab != 'message'" class="pf-c-page__main-section" id="client">
        <div class="pf-c-tabs tabs" id="primary">
            <button class="pf-c-tabs__scroll-button pf-m-secondary" aria-label="Scroll left">
                <i class="fas fa-angle-left" aria-hidden="true"></i>
            </button>
            <ul class="pf-c-tabs__list">
                <li class="pf-c-tabs__item" v-bind:class="{ 'pf-m-current': tab === 'consumer' }">
                    <button v-on:click="showConsumer" class="pf-c-tabs__link" id="consumerTab">Consumer</button>
                </li>
                <li class="pf-c-tabs__item" v-bind:class="{ 'pf-m-current': tab === 'producer' }">
                    <button v-on:click="showProducer" class="pf-c-tabs__link" id="producerTab">Producer</button>
                </li>
            </ul>
            <button class="pf-c-tabs__scroll-button pf-m-secondary" aria-label="Scroll right">
                <i class="fas fa-angle-right" aria-hidden="true"></i>
            </button>
        </div>
        <div v-show="tab === 'consumer'">
            <consumer></consumer>
        </div>
        <div v-if="tab === 'producer'">
            <producer></producer>
        </div>
    </section>
</div>
`

export { ClientTemplate }