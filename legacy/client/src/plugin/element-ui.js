// element-ui
import {
  Form,
  FormItem,
  Button,
  Radio,
  RadioGroup,
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Tag,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Popover,
  Pagination,
  Row,
  Col,
  Upload,
  Dialog,
  DatePicker,
  Collapse,
  Loading,
  Message,
  MessageBox
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition.js'

export default (Vue) => {
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
  Vue.component(Button.name, Button)
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
  Vue.component(Input.name, Input)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Select.name, Select)
  Vue.component(Option.name, Option)
  Vue.component(Tag.name, Tag)
  Vue.component(Tabs.name, Tabs)
  Vue.component(TabPane.name, TabPane)
  Vue.component(Table.name, Table)
  Vue.component(TableColumn.name, TableColumn)
  Vue.component(Popover.name, Popover)
  Vue.component(Pagination.name, Pagination)
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)
  Vue.component(Upload.name, Upload)
  Vue.component(Dialog.name, Dialog)
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(Collapse.name, Collapse)
  Vue.component(CollapseTransition.name, CollapseTransition)
  Vue.component(Message.name, Message)
  Vue.component(MessageBox.name, MessageBox)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$message = Message
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
}
