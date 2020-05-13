import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Collapse, HTMLTable, Intent, Callout, Divider } from "@blueprintjs/core";
import { handleVal } from "./utils";
import Highlight from 'react-highlighter';

export default function ItemCard(props) {
    debugger;
  console.log("props looks like")
  console.log(props)
  const [abstractIsOpen, setAbstractIsOpen] = useState(false);
  const [pubInfoIsOpen, setPubInfoIsOpen] = useState(false);

  function toggleAbstract() {
    setAbstractIsOpen( ! abstractIsOpen)
  }

  function togglePubInfo() {
    setPubInfoIsOpen( ! pubInfoIsOpen)
  }

const entities = [props.result.AnatomicalSiteMention, props.result.DiseaseDisorderMention]
const searchTerm = document.getElementById("search-bar-downshift-input").value
const pattern = new RegExp(searchTerm, "g");

  return (
    <Card style={{ margin: "20px 0" }} className="bg-success">
      <Callout style={{ marginBottom: "10px" }} intent={Intent.PRIMARY} icon={null}
      title={props.result.title}>
        <b>{"Journal: " + props.result.journal}</b>
      </Callout>
         <div>
             <Button onClick={togglePubInfo} style={{ marginBottom: "10px" }} intent={Intent.PRIMARY} >
                    {pubInfoIsOpen ? "Hide" : "Show"} Publication Info </Button>
            <Collapse isOpen={pubInfoIsOpen} style={{display: "flex", flex: 1}}>
                <h5>{"Source: " + props.result.source_x}</h5>
                {
                    props.result.publish_time ?
                    <h5>{"Publication Date: " + props.result.publish_time}</h5>
                    : null
                }
                <h5>{"Authors: " + props.result.authors}</h5>
                <h5>{"DOI: "+ props.result.doi}</h5>
                {
                    props.result.pmcid ?
                    <h5>{"PMC ID: "+ props.result.pmcid}</h5>
                    : null
                }
                {
                    props.result.pubmed_id ?
                    <h5>{"PubMed ID: "+ props.result.pubmed_id}</h5>
                    : null
                }
                {
                    props.result["WHO #Covidence"] ?
                    <h5>{"WHO #Covidence: " + props.result["WHO #Covidence"]}</h5>
                    : null
                }

             </Collapse>
            </div>

          <Divider></Divider>

      <div>
        {abstractIsOpen ? null :
            <p><Highlight search={searchTerm}>
            {props.result.abstract.split(" ").slice(0,50).join(" ") + "..."}
            </Highlight></p>
            }
      <Collapse isOpen={abstractIsOpen}>
        <p><Highlight search={searchTerm}>{props.result.abstract}</Highlight></p>
      </Collapse>
      <Button onClick={toggleAbstract} intent={Intent.PRIMARY}>
        {abstractIsOpen ? "Hide" : "Show"} Full Abstract </Button>
        </div>
      </Card>
  );
}
