import autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IElement } from "../../Element";
import ElementManager from "../../ElementManager";
import PeriodicTable from "../periodic-table/PeriodicTable";
import PtElementInfo from "../pt-element/PtElementInfo";
import Modal from "../shared/modal/Modal";
import Navbar from "../shared/navbar/Navbar";
import ElementInfo from "./element-info/ElementInfo";
import "./PeriodicTablePage.scss";

type Props = RouteComponentProps<any> & React.Props<any>;

interface IPeriodicTablePageState {
  elementInfo: {
    element: IElement;
    open: boolean;
  };
}

@autobind
class PeriodicTablePage extends React.Component<
  Props,
  IPeriodicTablePageState
> {
  public state: IPeriodicTablePageState = {
    elementInfo: {
      element: ElementManager.getElement(1),
      open: false
    }
  };

  private ptElements: Map<number, PtElementInfo> = new Map();

  public render() {
    const { elementInfo } = this.state;

    return (
      <div className="periodic-table-page">
        <Navbar
          title="Periodic Table"
          className="periodic-table-page__navbar"
          backButton={true}
          onBackButtonClick={this.onNavbarBackButtonClick}
        />

        <div className="periodic-table-page__table">
          <PeriodicTable elementRenderer={this.elementRenderer} />
        </div>

        <Modal
          className="periodic-table-page__modal-element-info"
          open={elementInfo.open}
          onClose={this.closeElementInfo}
        >
          <ElementInfo element={elementInfo.element} />
        </Modal>
      </div>
    );
  }

  private elementRenderer(atomic: number): JSX.Element {
    let ptElement = this.ptElements.get(atomic);

    if (!ptElement) {
      ptElement = new PtElementInfo({
        element: ElementManager.getElement(atomic),
        onClick: this.elementOnClick
      });

      this.ptElements.set(atomic, ptElement);
    }

    return ptElement.render();
  }

  private elementOnClick(element: IElement) {
    this.openElementInfo(element);
  }

  private openElementInfo(element: IElement) {
    this.setState({
      elementInfo: {
        element,
        open: true
      }
    });
  }

  private closeElementInfo() {
    const { elementInfo } = this.state;

    this.setState({
      elementInfo: {
        ...elementInfo,
        open: false
      }
    });
  }

  private onNavbarBackButtonClick() {
    const { history } = this.props;

    history.goBack();
  }
}

export default withRouter<Props>(PeriodicTablePage);
