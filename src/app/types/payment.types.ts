interface Payment {
    Auth: {
        bayiId: string,
        apiKey: string,
        secretKey: string
    },
    Data: {
        orderId: number,
        currency: string,
        locale: string,
        paidPrice: string,
        ipAddress: string,
        installmentNumber: number,
        description: string,
        callBackUrl: string
    },
    Customer: {
        customerId: string,
        customerName: string,
        customerSurname: string,
        gsmNumber: string,
        email: string,
        identityNumber: string,
        city: string,
        country: string
    },
    BillingAddress: {
        contactName: string | null,
        address: string | null,
        city: string | null,
        country: string | null,
        zipCode: number | null
    },
    ShippingAddress: {
        contactName?: string | null,
        address?: string | null,
        city?: string | null,
        country?: string | null,
        zipCode?: number | null
    },
    Products: {
        productId: string,
        name: string,
        productPrice: string,
        itemType: string
    }
}

export default Payment