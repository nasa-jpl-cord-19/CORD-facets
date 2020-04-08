import React, { Component } from "react";
import { FullSearch } from "@iec1761/superfacetsearchview-er";
import ItemCard from "./ItemCard";

class FacetView extends Component {
  GetSearchCards() {
    return [
      {
        display_name: "Anatomical Site",
        field: "AnatomicalSiteMention"
      },
      {
        display_name: "Dates in Abstract",
        field: "DateAnnotation"
      },
      {
        display_name: "Disease Disorder",
        field: "DiseaseDisorderMention"
      },
      {
        display_name: "Measurement",
        field: "MeasurementAnnotation"
      },
      {
        display_name: "Medication",
        field: "MedicationMention"
      },
      {
        display_name: "Procedure",
        field: "ProcedureMention"
      },
      {
        display_name: "Symptom", // range field
        field: "SignSymptomMention"
        // nested_field: "geo",
      },
      {
        display_name: "Publication Date",
        field: "publish_time"
      },
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
          credentials="elastic"
          app="pdi-trec-dd-pdf"
          elasticsearchUrl="https://localhost:6443"
          dataField={["abstract", "title"]}
          resultItem={resultItem => {
            // return <Card>{JSON.stringify(res, null, 2)}</Card>;
            return <ItemCard result={resultItem} />;
          }}
          searchCards={this.GetSearchCards()}
        />
      </div>
    );
  }
}

export default FacetView;
