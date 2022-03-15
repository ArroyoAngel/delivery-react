import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import { Component } from "react";

class InfinityScroll extends Component<any>{
	public state: any;
  constructor(props: any){
  	super(props)
		this.setState({ items: this.props.items})
  }

	pushData(reset?:boolean){
		if(reset)this.setState({
			data: [],
			isInfiniteDisabled: false
		})
		let items = this.state.items.filter(
			(product: any) => this.state.filter==='all'||product.type===this.state.filter
		)
		const max = this.state.data.length + 5;
		const min = max - 5;
		const newData: any = this.state.data;
		for (let i = min; i < max; i++) {
			newData.push(items[i]);
		}
		this.setState({
			data: newData,
			isInfiniteDisabled: newData.length===items.length?true:false
		});
	}

  render(){
		const loadData = (ev: any) => {
      setTimeout(() => {
        this.pushData();
        ev.target.complete();
      }, 500);
    }

    return <IonInfiniteScroll>
      <IonInfiniteScroll
      onIonInfinite={loadData}
      threshold="100px"
      disabled={this.state.isInfiniteDisabled}
      >
        <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonInfiniteScroll>
  }
}

export default InfinityScroll