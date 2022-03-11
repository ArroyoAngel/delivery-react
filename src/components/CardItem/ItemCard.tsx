import { Component } from 'react'
import {
    IonCard, IonCardContent,
    IonCol,
    IonRow,
  } from '@ionic/react';
import './ItemCard.css'
class ItemCard extends Component<any>{
    constructor(props: any){
        super(props)
    }
    render(){
        let children: any = this.props.children
        return <IonCard className='ItemCard' {...this.props}>
            <IonCardContent>
                <IonRow>
                    {children.map((child: any, index: number)=>{
                        return <IonCol key={index} className={child.props.className} >
                            {child}
                        </IonCol>
                    })}
                </IonRow>
            </IonCardContent>
        </IonCard>
    }
}

export default ItemCard