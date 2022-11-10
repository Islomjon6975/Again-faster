
const STOREFRONT_ACCESS_TOKEN =  '229340919e9e4fbbccf804cd417c16e1'
const GRAPHQL_URL = 'https://again-faster-islom.myshopify.com/api/2020-07/graphql.json'

// ---------- GRAPHQL_BODY ----------------
const GRAPHQL_BODY  = (query) => {
	return {
	'async': true,
	'crossDomain': true,
	'method': 'POST',
	'headers': {
		'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
		'Content-Type': 'application/graphql',
	},
	'body': query
	};
}

// ---------- fetchApi ----------------
async function fetchApi(productQuery) {
  return await fetch(GRAPHQL_URL, GRAPHQL_BODY(productQuery)).then((response) => response.json())
}


function customerAccessTokenCreate(accessToken) {
    const customerAccessTokenCreateQuery = `
        mutation customerAccessTokenCreate {
            customerAccessTokenCreate(input: {email: "islomabdulakhatov@gmail.com", password: "islom1234"}) {
            customerAccessToken {
                "${accessToken}"
            }
            customerUserErrors {
                message
            }
            }
        }
    `
    fetchApi(customerAccessTokenCreateQuery).then(res => console.log(res, 'customerAccessTokenCreate'))
}

customerAccessTokenCreate(STOREFRONT_ACCESS_TOKEN)


async function customerCreate() {
    const customerCreateQuery = `
        mutation {
            customerCreate(input: {
                  "email": "islomabdulakhatov6975@gmail.com",
                  "firstName": "Islom",
                  "lastName": "Abdulakhatov",
                  "password": "islom1234",
                  "phone": "+998995289896"
              }) {
                customer {
                    firstName
                    lastName
                    email
                    phone
                }
                customerUserErrors {
                    field
                    message
                    code
                }
            }
        }
    `
    await fetchApi(customerCreateQuery).then(res => console.log(res, 'customerCreate'))
}

customerCreate()

async function customer(customerAccessToken) {
    const customerQuery = `
        query {
            customer(customerAccessToken: "${customerAccessToken}") {
                id
                firstName
                lastName
                acceptsMarketing
                email
                phone
            }
        }
    `
    await fetchApi(customerQuery).then(res => console.log(res, 'customer'))
}

// customer(STOREFRONT_ACCESS_TOKEN)