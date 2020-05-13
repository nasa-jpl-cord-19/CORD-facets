import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    Elevation,
    Intent,
    Popover,
    PopoverInteractionKind
} from "@blueprintjs/core";
import {
    DataSearch,
    MultiDropdownList,
    ReactiveBase,
    ReactiveList,
    SelectedFilters
} from "@appbaseio/reactivesearch";

import { Col, Container, Row } from "react-grid-system";
import RangeSlider from "@appbaseio/reactivesearch/lib/components/range/RangeSlider";

export class SearchBase extends ReactiveBase {}

export class SearchCard extends Component {
    static propTypes = {
        componentId: PropTypes.string,
        dataField: PropTypes.string,
        title: PropTypes.string,
        reactAndList: PropTypes.array
    };

    render() {
        return (
            <Card elevation={Elevation.TWO} style={{ marginBottom: "20px" }}>
                <MultiDropdownList
                    className="multi-dropdown-list"
                    componentId={this.props.componentId}
                    dataField={this.props.dataField}
                    nestedField={this.props.nestedField}
                    title={this.props.title}
                    URLParams
                    react={{
                        and: this.props.reactAndList
                    }}
                    renderItem={(label, count, isSelected) => (
                        <div>
              <span
                  style={{
                      marginLeft: 5,
                      color: isSelected ? "red" : "black"
                  }}
              >
                {label} ({count})
              </span>
                        </div>
                    )}
                    innerClass={{
                        title: "multi-dropdown-list-title",
                        select: "multi-dropdown-list-select",
                        list: "multi-dropdown-list-list"
                    }}
                />
            </Card>
        );
    }
}

export class RangeSearchCard extends Component {
    render() {
        return (
            <Card elevation={Elevation.TWO}>
                <RangeSlider
                    componentId={this.props.componentId}
                    dataField={this.props.dataField}
                    nestedField={this.props.nestedField}
                    title={this.props.title}
                    URLParams
                    react={{
                        and: this.props.reactAndList
                    }}
                    range={this.props.range}
                />
            </Card>
        );
    }
}

export class SearchBar extends Component {
    render() {
        return (
            <div>
                <div className={"flexrow flexpadding"}>
                    <DataSearch
                        componentId="search-bar"
                        dataField={this.props.dataField}
                        // nestedField={this.props.nestedField}
                        autosuggest={true}
                        debounce={500}
                        URLParams
                        style={{ width: "100%" }}
                    />
                </div>
                <div className={"flexrow flexpadding"}>
                    <SelectedFilters showClearAll={true} clearAllLabel="Clear filters" />
                </div>
            </div>
        );
    }
}

export class SearchList extends Component {
    static propTypes = {
        reactAndList: PropTypes.array,
        resultItem: PropTypes.func
    };

    render() {
        return (
            <ReactiveList
                URLParams={true}
                className="search-list"
                componentId="search-list"
                react={{
                    and: this.props.reactAndList
                }}
                renderItem={res => this.props.resultItem(res)}
                pagination={true}
                paginationAt="both"
                loader="Loading Results.."
                infiniteScroll={false}
                style={{ marginTop: "15px" }}
                innerClass={{
                    resultsInfo: "search-list-results-info",
                    resultStats: "search-list-result-stats"
                }}
            />
        );
    }
}

export class FullSearch extends Component {
    static propTypes = {
        reactAndList: PropTypes.array,
        searchCards: PropTypes.array,
        elasticsearchUrl: PropTypes.string,
        datafield: PropTypes.array,
        resultItem: PropTypes.func
    };

    getReactAndList = () => {
        let reactAndList = [];

        const entries = Object.entries(this.props.searchCards);

        for (const [name, value] of entries) {
            reactAndList.push(value.display_name);
        }

        // add the search bar
        reactAndList.push("search-bar")

        return reactAndList;
    };

    getSearchCards = () => {
        const entries = Object.entries(this.props.searchCards);
        let sc = [];
        for (const [name, value] of entries) {
            if (value.range) {
                sc.push(
                    <RangeSearchCard
                        componentId={value.display_name}
                        dataField={value.field}
                        nestedField={value.nested_field}
                        title={value.display_name}
                        reactAndList={this.getReactAndList()}
                        range={value.range}
                    />
                );
            } else {
                sc.push(
                    <SearchCard
                        componentId={value.display_name}
                        dataField={value.field}
                        nestedField={value.nested_field}
                        title={value.display_name}
                        reactAndList={this.getReactAndList()}
                    />
                );
            }
        }
        return sc;
    };

    render() {
        return (
            <div className="App">
                <Container>
                    <SearchBase app={this.props.app} url={this.props.elasticsearchUrl}>
                        <Row>
                            <Col xs={4}>
                                <h3>Filters</h3>
                                <Popover
                                    interactionKind={PopoverInteractionKind.HOVER}
                                    popoverClassName="bp3-popover-content-sizing"
                                >
                                    <Button icon="info-sign">What are filters?</Button>
                                    <div>
                                        <p>
                                            Filter results by clicking one of the dropdowns and
                                            selecting one or more fields in the dropdown.
                                        </p>
                                        <p>Results will be filtered by the values you select.</p>
                                        <Button
                                            className="bp3-popover-dismiss"
                                            intent={Intent.PRIMARY}
                                        >
                                            Hide
                                        </Button>
                                    </div>
                                </Popover>
                                <div style={{ marginTop: "20px" }}>{this.getSearchCards()}</div>
                            </Col>
                            <Col xs={8}>
                                <div>
                                    <h3>Search</h3>
                                    <SearchBar dataField={this.props.dataField} nestedField={this.props.nestedField} />
                                </div>
                                <SearchList
                                    reactAndList={this.getReactAndList()}
                                    resultItem={this.props.resultItem}
                                />
                            </Col>
                        </Row>
                    </SearchBase>
                </Container>
            </div>
        );
    }
}
