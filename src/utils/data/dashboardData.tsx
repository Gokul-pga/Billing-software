import {colors} from '../../utils/theme/colors';
import {
  CreditNoteQuickAccess,
  CustomersQuickAccess,
  DeliveryChallanQuickAccess,
  ExpenseQuickAccess,
  InventoryQuickAccess,
  InvoiceTopCard1,
  InvoiceTopCard2,
  InvoiceTopCard3,
  InvoiceTopCard4,
  InvoicesQuickAccess,
  PaymentsQuickAccess,
  ProductsQuickAccess,
  PurchaseOrdersQuickAccess,
  PurchaseQuickAccess,
  PurchaseReturnQuickAccess,
  QuotationQuickAccess,
  SalesReturnQuickAccess,
  SignatureQuickAccess,
  TemplatesQuickAccess,
  VendorsQuickAccess,
} from '../svg';
import {labels} from './../labels';
import {
  CustomerImage1,
  CustomerImage2,
  CustomerImage3,
  CustomerImage4,
  RecenetCustomersImage1,
  RecenetCustomersImage2,
  RecentInvoiceImage1,
  RecentInvoiceImage2,
} from './../png';
import {screenName} from './../screenNames';

export const dashboardHeaderCardData = [
  {
    cardName: 'Invoices',
    iconName: 'file-text',
    iconType: 'Feather',
    date: 'This Week',
    amount: '₹2500',
    isAdd: true,
    percentage: '12.53 %',
    SvgImage: InvoiceTopCard1,
    id: 1,
  },
  {
    cardName: 'Total Customers',
    iconName: 'user-check',
    iconType: 'Feather',
    date: 'This Week',
    amount: '5',
    isAdd: false,
    percentage: '2.53 %',
    SvgImage: InvoiceTopCard2,
    id: 2,
  },
  // {
  //   cardName: 'Estimates',
  //   iconName: '',
  //   iconType: '',
  //   date: 'This Week',
  //   amount: '15',
  //   isAdd: true,
  //   percentage: '6.22 %',
  //   SvgImage: InvoiceTopCard3,
  //   id: 3,
  // },
  // {
  //   cardName: 'Amount Due',
  //   iconName: '',
  //   iconType: '',
  //   date: 'This Week',
  //   amount: '$32014',
  //   isAdd: true,
  //   percentage: '1.44 %',
  //   SvgImage: InvoiceTopCard4,
  //   id: 4,
  // },
];

export const addQuickData = [
  // {
  //   id: 1,
  //   title: 'Add Invoice',
  //   moveTo: screenName.AddInvoiceScreen,
  // },
  {id: 2, title: 'Product', moveTo: screenName.AddNewProducts},
  {id: 3, title: 'Customer', moveTo: screenName.AddCustomersScreen},
  {id: 4, title: 'Generate Invoice', moveTo: screenName.CreateBill},
  // {id: 4, title: 'Inventory'},

  // {id: 5, title: 'Add Bill Address', moveTo: screenName.AddBillAddress},
  // {id: 6, title: 'Vendors', moveTo: screenName.AddVendor},
  // {id: 7, title: 'Challan', moveTo: screenName.AddDeliveryScreen},
  // {id: 8, title: 'Expenses', moveTo: screenName.AddExpenses},

  // {id: 9, title: 'Credit Note', moveTo: screenName.AddCreditNotesScreen},
];

export const frequentCustomersdata = [
  {
    id: 1,
    title: 'Add New',
    img: CustomerImage1,
  },
  {
    id: 2,
    title: 'George',
    img: CustomerImage1,
  },
  {
    id: 3,
    title: 'Hollis',
    img: CustomerImage2,
  },
  {
    id: 4,
    title: 'Smith',
    img: CustomerImage3,
  },
  {
    id: 5,
    title: 'Letha',
    img: CustomerImage4,
  },
  {
    id: 6,
    title: 'Edward',
    img: CustomerImage1,
  },
  {
    id: 7,
    title: 'Hollis',
    img: CustomerImage2,
  },
  {
    id: 8,
    title: 'Smith',
    img: CustomerImage3,
  },
  {
    id: 9,
    title: 'John',
    img: CustomerImage4,
  },
];

export const quickAccessData = [
  {
    id: 1,
    title: labels.products,
    SvgImage: ProductsQuickAccess,
    screenName: screenName.Products,
  },
  {
    id: 2,
    title: labels.customers,
    SvgImage: CustomersQuickAccess,
    screenName: screenName.CustomersScreen,
  },
  {
    id: 3,
    title: labels.invoices,
    SvgImage: InvoicesQuickAccess,
    screenName: screenName.InvoiceScreen,
  },
  {
    id: 4,
    title: labels.salesReturn,
    SvgImage: SalesReturnQuickAccess,
    screenName: screenName.SalesReturn,
  },
  {
    id: 5,
    title: labels.quotation,
    SvgImage: QuotationQuickAccess,
    screenName: screenName.QuotationsScreen,
  },
  {
    id: 6,
    title: labels.vendors,
    SvgImage: VendorsQuickAccess,
    screenName: screenName.VendorsScreen,
  },
  {
    id: 7,
    title: labels.deliveryChallan,
    SvgImage: DeliveryChallanQuickAccess,
    screenName: screenName.DeliverChallanScreen,
  },
  {
    id: 8,
    title: labels.creditNote,
    SvgImage: CreditNoteQuickAccess,
    screenName: screenName.CreditNotesScreen,
  },
  {
    id: 9,
    title: labels.payments,
    SvgImage: PaymentsQuickAccess,
    screenName: screenName.PaymentsScreen,
  },
  {
    id: 10,
    title: labels.purchase,
    SvgImage: PurchaseQuickAccess,
    screenName: screenName.Purchases,
  },
];

export const quickAccessDataSecond = [
  {
    id: 1,
    title: labels.purchaseReturn,
    SvgImage: PurchaseReturnQuickAccess,
    screenName: screenName.PurchaseReturn,
  },
  {
    id: 2,
    title: labels.purchaseOrders,
    SvgImage: PurchaseOrdersQuickAccess,
    screenName: screenName.PurchaseOrderScreen,
  },
  {
    id: 3,
    title: labels.inventory,
    SvgImage: InventoryQuickAccess,
    screenName: screenName.InventoryList,
  },
  {
    id: 4,
    title: labels.expense,
    SvgImage: ExpenseQuickAccess,
    screenName: screenName.ExpensesScreen,
  },
  {
    id: 5,
    title: labels.templates,
    SvgImage: TemplatesQuickAccess,
    screenName: screenName.InvoiceTemplatesScreen,
  },
  {
    id: 6,
    title: labels.signatures,
    SvgImage: SignatureQuickAccess,
    screenName: screenName.Signatures,
  },
];

export const invoiceStaticsData = [
  {
    id: 1,
    title: labels.paid,
    amount: '$738',
    color: colors.green,
    percentage: 40,
  },
  {
    id: 2,
    title: labels.drafted,
    amount: '$4787',
    color: colors.blue,
    percentage: 140,
  },
  {
    id: 3,
    title: labels.partiallypaid,
    amount: '$150',
    color: colors.yellow,
    percentage: 40,
  },
  {
    id: 4,
    title: labels.overDue,
    amount: '$645',
    color: colors.danger,
    percentage: 80,
  },
];

export const recentInvoicesdata = [
  {
    id: 1,
    img: RecentInvoiceImage1,
    invoiceNo: '#INV0021',
    companyName: 'BYD Groups',
    status: labels.paid,
    color: colors.green,
    amount: '$264',
    modeOfPayment: 'Cash',
    dueDate: '23 Apr 2024',
  },
  {
    id: 2,
    img: RecentInvoiceImage2,
    invoiceNo: '#INV0022',
    companyName: 'World Energy',
    status: labels.sent,
    color: colors.redFour,
    amount: '$564',
    modeOfPayment: 'Cash',
    dueDate: '21 Apr 2024',
  },
];

export const recentCustomersData = [
  {
    id: 1,
    img: RecenetCustomersImage1,
    customerTitle: 'FedEX',
    invoiceCount: '8',
    balance: '$457',
  },
  {
    id: 2,
    img: RecenetCustomersImage2,
    customerTitle: 'NedBank',
    invoiceCount: '6',
    balance: '$762',
  },
  {
    id: 3,
    img: RecenetCustomersImage1,
    customerTitle: 'FedEX',
    invoiceCount: '8',
    balance: '$457',
  },
  {
    id: 4,
    img: RecenetCustomersImage2,
    customerTitle: 'NedBank',
    invoiceCount: '6',
    balance: '$762',
  },
];

export const addNewDashboardData = [
  {
    id: 1,
    title: labels.customers,
    moveTo: screenName.AddCustomersScreen,
  },
  {
    id: 2,
    title: labels.vendors,
    moveTo: screenName.AddVendor,
  },
  {
    id: 3,
    title: labels.products,
    moveTo: screenName.DashboardScreen,
  },
  {
    id: 4,
    title: labels.inventory,
    moveTo: screenName.DashboardScreen,
  },
  {
    id: 5,
    title: labels.purchase,
    moveTo: screenName.AddPurchaseOrderScreen,
  },
  {
    id: 6,
    title: labels.invoices,
    moveTo: screenName.AddInvoiceScreen,
  },
  {
    id: 7,
    title: labels.purchaseOrders,
    moveTo: screenName.AddPurchaseOrderScreen,
  },
  {
    id: 8,
    title: labels.creditNote,
    moveTo: screenName.AddCreditNotesScreen,
  },
  {
    id: 9,
    title: labels.quotation,
    moveTo: screenName.AddQuotationScreen,
  },
  {
    id: 10,
    title: labels.purchaseReturn,
    moveTo: screenName.AddPurchaseOrderScreen,
  },
  {
    id: 11,
    title: labels.expenses,
    moveTo: screenName.AddExpenses,
  },
  {
    id: 12,
    title: labels.deliveryChallan,
    moveTo: screenName.AddDeliveryScreen,
  },
];

export const menuData = [
  {
    id: 1,
    title: labels.products,
    SvgImage: ProductsQuickAccess,
    screenName: screenName.Products,
  },
  {
    id: 2,
    title: labels.customers,
    SvgImage: CustomersQuickAccess,
    screenName: screenName.CustomersScreen,
  },
  {
    id: 3,
    title: labels.invoices,
    SvgImage: InvoicesQuickAccess,
    screenName: screenName.InvoiceScreen,
  },
  {
    id: 4,
    title: labels.salesReturn,
    SvgImage: SalesReturnQuickAccess,
    screenName: screenName.Products,
  },
  {
    id: 5,
    title: labels.quotation,
    SvgImage: QuotationQuickAccess,
    screenName: screenName.QuotationsScreen,
  },
  {
    id: 6,
    title: labels.vendors,
    SvgImage: VendorsQuickAccess,
    screenName: screenName.VendorsScreen,
  },
  {
    id: 7,
    title: labels.deliveryChallan,
    SvgImage: DeliveryChallanQuickAccess,
    screenName: screenName.DeliverChallanScreen,
  },
  {
    id: 8,
    title: labels.creditNote,
    SvgImage: CreditNoteQuickAccess,
    screenName: screenName.CreditNotesScreen,
  },
  {
    id: 9,
    title: labels.payments,
    SvgImage: PaymentsQuickAccess,
    screenName: screenName.PaymentsScreen,
  },
  {
    id: 10,
    title: labels.purchase,
    SvgImage: PurchaseQuickAccess,
    screenName: screenName.Products,
  },
  {
    id: 11,
    title: labels.purchaseReturn,
    SvgImage: PurchaseReturnQuickAccess,
    screenName: screenName.Products,
  },
  {
    id: 12,
    title: labels.purchaseOrders,
    SvgImage: PurchaseOrdersQuickAccess,
    screenName: screenName.PurchaseOrderScreen,
  },
  {
    id: 13,
    title: labels.inventory,
    SvgImage: InventoryQuickAccess,
    screenName: screenName.InventoryList,
  },
  {
    id: 14,
    title: labels.expense,
    SvgImage: ExpenseQuickAccess,
    screenName: screenName.ExpensesScreen,
  },
  {
    id: 15,
    title: labels.templates,
    SvgImage: TemplatesQuickAccess,
    screenName: screenName.InvoiceTemplatesScreen,
  },
  {
    id: 16,
    title: labels.signatures,
    SvgImage: SignatureQuickAccess,
    screenName: screenName.Signatures,
  },
];
