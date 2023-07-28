import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import Payment from "../types/payment.types";
import { map } from 'rxjs/operators';
import { Observable, } from "rxjs";
import axios from "axios";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class PaymentService {

    constructor(
    ) { }


    async createPaymentForm(paymentData: any){
        const endpointData = {
            Auth: {
                bayiId: environment.weepay.bayiId,
                apiKey: environment.weepay.apiKey,
                secretKey: environment.weepay.secretKey
            },
            Data: {
                orderId: parseInt(uuidv4().replace(/\D/g, ''), 10),
                currency: 'TL',
                locale: 'tr',
                paidPrice: paymentData.price,
                ipAddress: '192.168.1.1',
                installmentNumber: 1,
                description: 'IQ Test Ücreti',
                callBackUrl: environment.expressServer + '/paymentResult'
            },
            Customer: {
                customerId: uuidv4(),
                customerName: paymentData.name,
                customerSurname: paymentData.surname,
                gsmNumber: paymentData.gsmNumber,
                email: paymentData.email,
                identityNumber: paymentData.identifyNumber,
                city: paymentData.city,
                country: 'Türkiye'
            },
            BillingAddress: {
                contactName: `${paymentData.name} ${paymentData.surname}`,
                address: paymentData.city,
                city: paymentData.city,
                country: 'Türkiye',
                zipCode: 100
            },
            ShippingAddress: {
                contactName: 'asd',
                address: 'nasdasull',
                city: 'nullasda',
                country: 'nuasdasdll',
                zipCode: 34164
            },
            Products: [
                {
                    productId: uuidv4(),
                    name: paymentData.productName,
                    productPrice: paymentData.price,
                    itemType: 'VIRTUAL'
                }
            ]
        };

        const url = "/api/Payment/PaymentCreate"
        return (await axios.post(environment.apiURl, endpointData)).data
    }

}
