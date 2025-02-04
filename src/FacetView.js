import React, { Component } from "react";
import ItemCard from "./ItemCard";

import {
  Card
} from "@blueprintjs/core";
import {FullSearch} from "./SuperFacetViewer";

class FacetView extends Component {
  GetSearchCards() {
    return [

      {
        display_name: "Anatomical Site",
        field: "AnatomicalSiteMention.keyword"
      },
      //Dates need to be normalized in ES before they are shown
//      {
//        display_name: "Dates Mentioned in Abstract",
//        field: "DateAnnotation.keyword"
//      },
      {
        display_name: "Disease Disorder",
        field: "DiseaseDisorderMention"
      },
      {
        display_name: "Measurement",
        field: "MeasurementAnnotation.keyword"
      },
      {
        display_name: "Medication",
        field: "MedicationMention.keyword"
      },
      {
        display_name: "Procedure",
        field: "ProcedureMention"
      },
      {
        display_name: "Symptom", // range field
        field: "SignSymptomMention"
      },
//      {
//        display_name: "Publication Date",
//        field: "publish_time"
//      },
      {
        display_name: "Source",
        field: "source_x"
      },
      {
        display_name: "Journal",
        field: "journal"
      }
    ];
  }

  render() {
    return (
      <div className="FacetView">
        <FullSearch
          credentials={null}
          app="cord"
          elasticsearchUrl="https://cord-facets.covid19data.space:443"
          //elasticsearchUrl="http://e6af1e9c.ngrok.io/"
          dataField={["title", "abstract"]}
          resultItem={resultItem => {
             return <ItemCard result={resultItem} />;
          }}
          //TODO: return Range Search Card for publish_time
          searchCards={this.GetSearchCards()}
        />
      </div>
    );
  }
}

export default FacetView;
