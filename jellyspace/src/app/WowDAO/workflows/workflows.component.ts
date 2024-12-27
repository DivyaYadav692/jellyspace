import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

interface IPort {
  id: string;
  name: string;
  type: 'input' | 'output';
  position: 'left' | 'right';
  value?: any;
  message?: string;
}

interface IWire {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  targetNodeId: string;
  targetPortId: string;
  points: { x: number; y: number }[];
}

interface IPlacedWidget {
  id: string;
  name: string;
  image: string;
  x: number;
  y: number;
  type: string;
  position: { x: number; y: number };
  inputs: IPort[];
  outputs: IPort[];
  isActive: boolean;
  width?: number;
  borderColor?: string;
  displayText?: string;
  height?: number;
}

interface IWireConnection {
  id: string;
  sourceWidgetId: string;
  sourcePortId: string;
  targetWidgetId: string;
  targetPortId: string;
  value?: any;
  isHovered?: boolean;
}

// Update the interface/type definition for your input items
interface InputItem {
  id: string;
  name: string;
  displayText: string;
  borderColor: string;
  active: boolean;
  type: string;
  x: number;
  y: number;
  position: { x: number; y: number };
  isActive: boolean;
  width: number;
  height: number;
  inputs: IPort[];
  outputs: IPort[];
  image: string;
}

export interface WidgetOutput {
  widgetId: string;
  widgetName: string;
  value: any;
  timestamp: Date;
}

interface ContextMenuPosition {
  x: number;
  y: number;
}

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements AfterViewInit, OnInit {
  currentSection: string = 'Overview';
  sectionContent: string = 'This is the content for the Overview section.';
  isSidebarCollapsed: boolean = false;
  
  droppedWidgets: any[] = [];
  placedWidgets: IPlacedWidget[] = [];
  connections: any[] = [];
  activeConnection: any = null;
  activeContextMenu: number | null = null;
  contextMenuPosition: ContextMenuPosition = { x: 0, y: 0 };
  wires: IWire[] = [];
  activeWire: Partial<IWire> | null = null;
  draggingWire = false;
  wireConnections: IWireConnection[] = [];
  isDrawingWire: boolean = false;
  
  // For wire drawing
  @ViewChild('svgContainer') svgContainer!: ElementRef;
  private mousePosition = { x: 0, y: 0 };

  // Add these properties
  public isDraggingWire: boolean = false;
  private sourcePort: any = null;
  private sourceWidget: any = null;
  private tempWire: any = null;

  selectedWidget: any = null;

  isRightSidebarExpanded: boolean = false;
  activeTab: 'data' | 'outputs' | 'selected' | 'api' = 'data';

  menuItems = [
    {
      name: 'Input',
      icon: 'fas fa-sign-in-alt',
      action: () => this.toggleInput(),
      isExpanded: false
    },
    {
      name: 'Models',
      icon: 'fas fa-cube',
      action: () => this.handleModelClick(),
      isExpanded: false
    },
    {
      name: 'Tools',
      icon: 'fas fa-tools',
      action: () => this.handleToolsClick(),
      isExpanded: false
    },
    {
      name: 'API Builder',
      icon: 'fas fa-cogs',
      action: () => this.handleAPIBuilderClick(),
      isExpanded: false
    },
    {
      name: 'Integration',
      icon: 'fas fa-plug',
      action: () => this.toggleIntegration(),
      isExpanded: false
    }
  ];

  isInputExpanded: boolean = false;
  isIntegrationExpanded: boolean = false;

  integrationItems: InputItem[] = [
    {
      id: 'database',
      name: 'Database',
      displayText: 'Database',
      borderColor: '#336791',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Database.png',
      inputs: [
        { id: 'database_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'database_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'crm',
      name: 'CRM',
      displayText: 'CRM',
      borderColor: '#00a1e0',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/CRM.png',
      inputs: [
        { id: 'crm_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'crm_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'erp',
      name: 'ERP',
      displayText: 'ERP',
      borderColor: '#ff6d00',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/ERP.png',
      inputs: [
        { id: 'erp_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'erp_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'wms',
      name: 'WMS',
      displayText: 'WMS',
      borderColor: '#4caf50',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/WMS.png',
      inputs: [
        { id: 'wms_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'wms_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'mes',
      name: 'MES',
      displayText: 'MES',
      borderColor: '#2196f3',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/MES.png',
      inputs: [
        { id: 'mes_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'mes_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'tms',
      name: 'TMS',
      displayText: 'TMS',
      borderColor: '#3f51b5',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/TMS.png',
      inputs: [
        { id: 'tms_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'tms_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'aps',
      name: 'APS',
      displayText: 'APS',
      borderColor: '#9c27b0',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/APS.png',
      inputs: [
        { id: 'aps_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'aps_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'scm',
      name: 'SCM',
      displayText: 'SCM',
      borderColor: '#e91e63',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/SCM.png',
      inputs: [
        { id: 'scm_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'scm_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'plm',
      name: 'PLM',
      displayText: 'PLM',
      borderColor: '#795548',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/PLM.png',
      inputs: [
        { id: 'plm_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'plm_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud',
      displayText: 'Cloud',
      borderColor: '#00bcd4',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Cloud.png',
      inputs: [
        { id: 'cloud_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'cloud_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'data-warehouse',
      name: 'Data Warehouse',
      displayText: 'Data Warehouse',
      borderColor: '#ff5722',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Data Warehouse.png',
      inputs: [
        { id: 'data_warehouse_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'data_warehouse_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'streaming-system',
      name: 'Streaming System',
      displayText: 'Streaming System',
      borderColor: '#607d8b',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Steaming System.png',
      inputs: [
        { id: 'streaming_system_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'streaming_system_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'edge-iot',
      name: 'Edge IoT',
      displayText: 'Edge IoT',
      borderColor: '#009688',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Edge - IoT.png',
      inputs: [
        { id: 'edge_iot_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'edge_iot_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'dlt-blockchain',
      name: 'DLT Blockchain',
      displayText: 'DLT Blockchain',
      borderColor: '#673ab7',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/DLT - Blockchain.png',
      inputs: [
        { id: 'dlt_blockchain_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'dlt_blockchain_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'sensor',
      name: 'Sensor',
      displayText: 'Sensor',
      borderColor: '#9c27b0',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Sensor.png',
      inputs: [
        { id: 'sensor_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'sensor_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'digital-twin',
      name: 'Digital Twin',
      displayText: 'Digital Twin',
      borderColor: '#4CAF50',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Digital Twin.png',
      inputs: [
        { id: 'digital_twin_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'digital_twin_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'satellite',
      name: 'Satellite',
      displayText: 'Satellite',
      borderColor: '#2196F3',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Satellite.png',
      inputs: [
        { id: 'satellite_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'satellite_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'spaceport',
      name: 'Spaceport',
      displayText: 'Spaceport',
      borderColor: '#607D8B',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Spaceport.png',
      inputs: [
        { id: 'spaceport_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'spaceport_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'custom-api',
      name: 'Custom API',
      displayText: 'Custom API',
      borderColor: '#FF5722',
      active: false,
      type: 'integration-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: '../../../assets/login-page/Custom API.png',
      inputs: [
        { id: 'custom_api_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'custom_api_out', name: 'Output', type: 'output', position: 'right' }
      ]
    }
  ];

  inputItems: InputItem[] = [
    {
      id: 'Data Joiner',
      name: 'Data Joiner',
      displayText: 'Data Joiner',
      borderColor: '#00ff00',
      active: false,
      type: 'widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: 'assets/Widgets/Data Joiner.png',
      inputs: [
        { id: 'Data Joiner_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'Data Joiner', name: 'Output', type: 'output', position: 'right' }
      ]
    },
   {
     id:'Table Reader',
    name:'Table Reader',
    displayText:'Table Reader',
    borderColor:'#00ff00',
    active:false,
    type:'widget',
    x:0,
    y:0,  
    position:{x:0,y:0},
    isActive:false,
    width:120,
    height:40,
    image:'assets/Widgets/Table Reader.png',
    inputs:[
      {id:'Table Reader_in',name:'Input',type:'input',position:'left'}
    ],  
    outputs:[
      {id:'Table Reader',name:'Output',type:'output',position:'right'}
    ]
    },
   {     
      id: 'blockchain',
      name: 'Blockchain',
      displayText: 'Blockchain',
      borderColor: '#00ff00',
      active: false,
      type: 'widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: 'assets/Widgets/Blockchain.png',
      inputs: [
        { id: 'blockchain_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'blockchain_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'text-input',
      name: 'Text',
      displayText: 'Text Input',
      borderColor: '#00ff00',
      active: false,
      type: 'widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='17' y1='10' x2='3' y2='10'%3E%3C/line%3E%3Cline x1='21' y1='6' x2='3' y2='6'%3E%3C/line%3E%3Cline x1='21' y1='14' x2='3' y2='14'%3E%3C/line%3E%3Cline x1='17' y1='18' x2='3' y2='18'%3E%3C/line%3E%3C/svg%3E`,
      inputs: [
        { id: 'text_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'text_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'web-extractor',
      name: 'Web Extractor',
      displayText: 'Web Extractor',
      borderColor: '#00ff00',
      active: false,
      type: 'input-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='2' y1='12' x2='22' y2='12'%3E%3C/line%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'%3E%3C/path%3E%3C/svg%3E`,
      inputs: [
        { id: 'web_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'web_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'document-to-text',
      name: 'Document-to-Text',
      displayText: 'Document-to-Text',
      borderColor: '#00ff00',
      active: false,
      type: 'input-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3Cline x1='16' y1='13' x2='8' y2='13'%3E%3C/line%3E%3Cline x1='16' y1='17' x2='8' y2='17'%3E%3C/line%3E%3Cpolyline points='10 9 9 9 8 9'%3E%3C/polyline%3E%3C/svg%3E`,
      inputs: [
        { id: 'document_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'document_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'google-search',
      name: 'Google Search',
      displayText: 'Google Search',
      borderColor: '#0066ff',
      active: false,
      type: 'input-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E`,
      inputs: [
        { id: 'google_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'google_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'http-get',
      name: 'HTTP Get',
      displayText: 'HTTP Get',
      borderColor: '#00ff00',
      active: false,
      type: 'input-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M8 12h8'%3E%3C/path%3E%3Cpath d='M12 8l4 4-4 4'%3E%3C/path%3E%3C/svg%3E`,
      inputs: [
        { id: 'http_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'http_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      id: 'file-upload',
      name: 'File Upload',
      displayText: 'File Upload',
      borderColor: '#00ff00',
      active: false,
      type: 'input-widget',
      x: 0,
      y: 0,
      position: { x: 0, y: 0 },
      isActive: false,
      width: 120,
      height: 40,
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'%3E%3C/path%3E%3Cpolyline points='17 8 12 3 7 8'%3E%3C/polyline%3E%3Cline x1='12' y1='3' x2='12' y2='15'%3E%3C/line%3E%3C/svg%3E`,
      inputs: [
        { id: 'file_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'file_out', name: 'Output', type: 'output', position: 'right' }
      ]
    }
  ];

  isDragging: boolean = false;

  // Add these properties
  widgetOutputs: WidgetOutput[] = [];

  selectedWidgets: IPlacedWidget[] = [];
  isMultiSelect: boolean = false;

  // Add this property to the class
  private dragImage: HTMLElement | null = null;

  isOutputExpanded: boolean = false;
  outputItems: any[] = [
    {
      name: 'Convert2DB',
      type: 'output',
      image: 'assets/Widgets/Convert2DB.png',
      inputs: [
        { id: 'convert2db_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'convert2db_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Convert2Excel',
      type: 'output',
      image: 'assets/Widgets/Convert2Excel.png',
      inputs: [
        { id: 'convert2excel_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'convert2excel_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Convert2HTML',
      type: 'output',
      image: 'assets/Widgets/Convert2HTML.png',
      inputs: [
        { id: 'convert2html_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'convert2html_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Convert2PDF',
      type: 'output',
      image: 'assets/Widgets/Convert2PDF.png',
      inputs: [
        { id: 'convert2pdf_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'convert2pdf_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Convert2RTF',
      type: 'output',
      image: 'assets/Widgets/Covert2RTF.png',
      inputs: [
        { id: 'convert2rtf_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'convert2rtf_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
  ];

  isViewsExpanded = false;
  viewItems = [
    {
      name: 'Generate',
      image: 'assets/Widgets/Generate.png',
      type: 'view',
      inputs: [
        { id: 'generate_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'generate_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Management',
      image: 'assets/Widgets/Management.png',
      type: 'view',
      inputs: [
        { id: 'management_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'management_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'CreateAPI',
      image: 'assets/Widgets/CreateAPI.png',
      type: 'view',
      inputs: [
        { id: 'createapi_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'createapi_out', name: 'Output', type: 'output', position: 'right' }
      ]
    }
  ];

  // Add new property for Tools expansion
  isToolsExpanded: boolean = false;

  // Add new arrays for tools submenus
  toolItems: any[] = [
    {
      name: 'Equation',
      type: 'tool',
      image: 'assets/Widgets/Equation.png',
      inputs: [
        { id: 'equation_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'equation_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Condition',
      type: 'tool',
      image: 'assets/Widgets/Condition.png',
      inputs: [
        { id: 'condition_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'condition_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Algorithm',
      type: 'tool',
      image: 'assets/Widgets/Algorithm.png',
      inputs: [
        { id: 'algorithm_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'algorithm_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Application Code',
      type: 'tool',
      image: 'assets/Widgets/ApplicationCode.png',
      inputs: [
        { id: 'applicationcode_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'applicationcode_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Merge Cells',
      type: 'tool',
      image: 'assets/Widgets/MergeCells.png',
      inputs: [
        { id: 'mergecells_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'mergecells_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },{
      name: 'Application Code',
      type: 'tool',
      image: 'assets/Widgets/ApplicationCode.png',
      inputs: [
        { id: 'applicationcode_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'applicationcode_out', name: 'Output', type: 'output', position: 'right' }
      ]
    }
  ];

  isApiBuilderExpanded: boolean = false;

  apiBuilderItems: any[] = [
    {
      name: 'Compute',
      type: 'api-builder',
      image: 'assets/Widgets/Compute.png',
      inputs: [
        { id: 'compute_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'compute_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name:'Data | Connector',
      type: 'api-builder',
      image: 'assets/Widgets/Data_Connector.png',
      inputs: [
        { id: 'dataconnector_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'dataconnector_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Equation',
      type: 'api-builder',
        image: 'assets/Widgets/Equation.png',
      inputs: [
        { id: 'equation_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'equation_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'AI | Advisor',
      type: 'api-builder',
      image: 'assets/Widgets/AI-Advisor.png',
      inputs: [
        { id: 'aiavisor_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'aiavisor_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Condition',
      type: 'api-builder',
      image: 'assets/Widgets/Condition.png',
      inputs: [
        { id: 'condition_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'condition_out', name: 'Output', type: 'output', position: 'right' }
      ]
    },
    {
      name: 'Algorithm',
      type: 'api-builder',
      image: 'assets/Widgets/Algorithm.png',
      inputs: [
        { id: 'algorithm_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'algorithm_out', name: 'Output', type: 'output', position: 'right' }
      ]
    }
  ];

  isModelsExpanded: boolean = false;

  modelItems: any[] = [
    {
      name: 'Data | AI App',
      type: 'model',
      image: 'assets/Widgets/Algorithm.png',
      inputs: [
        { id: 'dataaiapp_in', name: 'Input', type: 'input', position: 'left' }
      ],
      outputs: [
        { id: 'dataaiapp_out', name: 'Output', type: 'output', position: 'right' }
      ]
    }
  ];

  // Add these properties to your component class
  showPromptDialog: boolean = false;
  promptText: string = '';

  constructor(private cdr: ChangeDetectorRef) {
    // Initialize with existing widgets
  }

  ngAfterViewInit() {
    // Initialize wire drawing
  }

  ngOnInit() {
    // Initialize wire drawing
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  selectSection(section: string) {
    this.currentSection = section.charAt(0).toUpperCase() + section.slice(1);
    switch (section) {
      case 'overview':
        this.sectionContent = 'This is the content for the Overview section.';
        break;
      case 'cohorts':
        this.sectionContent = '';
        break;
      case 'syncs':
        this.sectionContent = 'This is the content for the Syncs section.';
        break;
      case 'computations':
        this.sectionContent = 'This is the content for the Computations section.';
        break;
      case 'predictions':
        this.sectionContent = 'This is the content for the Predictions section.';
        break;
      case 'recommendations':
        this.sectionContent = 'This is the content for the Recommendations section.';
        break;
      case 'userProfileAPI':
        this.sectionContent = 'This is the content for the User Profile API section.';
        break;
      default:
        this.sectionContent = '';
    }
  }

  onDragStart(event: DragEvent, widget: any) {
    this.isDragging = true;
    if (event.dataTransfer) {
      const img = new Image();
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      event.dataTransfer.setDragImage(img, 0, 0);
      
      const widgetData: IPlacedWidget = {
        id: `widget_${Date.now()}`,
        name: widget.name,
        image: widget.image,
        type: widget.type || 'default',
        x: 0,
        y: 0,
        position: { x: 0, y: 0 },
        inputs: widget.inputs || [],
        outputs: widget.outputs || [],
        isActive: false,
        width: 120,
        height: 120
      };
      
      event.dataTransfer.setData('application/json', JSON.stringify(widgetData));
      event.dataTransfer.effectAllowed = 'move';
      
      const element = event.target as HTMLElement;
      element.classList.add('dragging');
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent) {
    this.isDragging = false;
    const element = event.target as HTMLElement;
    element.classList.remove('dragging');
  }

  // Add this method to handle drop events on the canvas
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer) {
      try {
        const widgetData = JSON.parse(event.dataTransfer.getData('application/json'));
        const canvasRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        
        // Calculate position relative to the mouse cursor
        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;
        
        // Create new widget with position directly under cursor
        const newWidget: IPlacedWidget = {
          ...widgetData,
          id: `${widgetData.name}_${Date.now()}`,
          position: { x, y },
          x: x,
          y: y,
          width: widgetData.width || 120,
          height: widgetData.height || 40,
          isActive: false,
          borderColor: widgetData.borderColor,
          displayText: widgetData.displayText,
          inputs: [...(widgetData.inputs || [])],
          outputs: [...(widgetData.outputs || [])]
        };
        
        this.placedWidgets.push(newWidget);
        this.cdr.detectChanges();
      } catch (error) {
        console.error('Error dropping widget:', error);
      }
    }
    this.isDragging = false;
  }

  // Add this method to handle dragover
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }

  onWidgetClick(widget: IPlacedWidget, event: MouseEvent) {
    // Stop event from bubbling up to prevent document click handler
    event.stopPropagation();
    
    // Remove selected class from all widgets
    document.querySelectorAll('.placed-widget').forEach(el => {
      el.classList.remove('selected');
    });

    // Add selected class to clicked widget
    const widgetElement = (event.currentTarget as HTMLElement);
    widgetElement.classList.add('selected');

    // Update selected widget in component
    this.selectedWidget = widget;
    this.cdr.detectChanges(); // Ensure view is updated
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Check if click is on canvas area or any non-widget element
    if (!target.closest('.placed-widget') && 
        (target.closest('.canvas-area') || target.classList.contains('canvas-area'))) {
      // Remove selected class from all widgets
      document.querySelectorAll('.placed-widget').forEach(el => {
        el.classList.remove('selected');
      });
      this.selectedWidget = null;
      this.cdr.detectChanges(); // Ensure view is updated
    }
  }

  onDragEnded(event: CdkDragEnd, widget: IPlacedWidget) {
    const element = event.source.element.nativeElement;
    element.style.zIndex = 'auto';
    
    const finalPosition = event.source.getFreeDragPosition();
    
    widget.position = {
      x: widget.position.x + finalPosition.x,
      y: widget.position.y + finalPosition.y
    };
    
    this.updateWireConnections();
    event.source.reset();
  }

  startConnection(event: MouseEvent, widget: IPlacedWidget, port: IPort) {
    event.stopPropagation();
    
    // Get the port element's position
    const portElement = event.target as HTMLElement;
    const portRect = portElement.getBoundingClientRect();
    
    this.activeConnection = {
      sourceWidget: widget,
      sourcePort: port,
      startX: portRect.left + portRect.width / 2,  // Center of the port
      startY: portRect.top + portRect.height / 2
    };
    
    // Create SVG for connection
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.classList.add('connection-svg');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', '#4a90e2');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.classList.add('connection-line');
    
    svg.appendChild(path);
    document.querySelector('.canvas-area')?.appendChild(svg);
    
    document.addEventListener('mousemove', this.updateConnection);
    document.addEventListener('mouseup', this.endConnection);
  }

  updateConnection = (event: MouseEvent) => {
    if (this.activeConnection) {
      const line = document.querySelector('.connection-line');
      const canvasRect = document.querySelector('.canvas-area')?.getBoundingClientRect();
      
      if (line && canvasRect) {
        const x1 = this.activeConnection.startX;
        const y1 = this.activeConnection.startY;
        const x2 = event.clientX - canvasRect.left;
        const y2 = event.clientY - canvasRect.top;
        
        const dx = x2 - x1;
        const controlPointOffset = Math.min(Math.abs(dx) * 0.5, 150);
        const path = `M ${x1} ${y1} C ${x1 + controlPointOffset} ${y1}, ${x2 - controlPointOffset} ${y2}, ${x2} ${y2}`;
        line.setAttribute('d', path);
      }
    }
  }

  endConnection = (event: MouseEvent) => {
    if (this.activeConnection) {
      const targetElement = document.elementFromPoint(event.clientX, event.clientY);
      const targetPortElement = targetElement?.closest('.port') as HTMLElement;
      
      if (targetPortElement) {
        const targetPortId = targetPortElement.getAttribute('data-port-id');
        const targetPortType = targetPortElement.getAttribute('data-port-type');
        const sourcePort = this.activeConnection.sourcePort;
        
        // Check if connection is valid (input to output or output to input)
        if (targetPortId && sourcePort.type !== targetPortType) {
          const connection = {
            id: `conn-${Date.now()}`,
            sourcePortId: sourcePort.id,
            targetPortId: targetPortId,
            sourcePosX: this.activeConnection.startX,
            sourcePosY: this.activeConnection.startY,
            targetPosX: event.clientX,
            targetPosY: event.clientY
          };
          
          this.connections.push(connection);
          this.drawConnection(connection);
        }
      }
      
      // Remove temporary connection line
      document.querySelector('.connection-svg')?.remove();
      this.activeConnection = null;
    }
    
    document.removeEventListener('mousemove', this.updateConnection);
    document.removeEventListener('mouseup', this.endConnection);
  }

  drawConnection(connection: any) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.classList.add(`connection-${connection.id}`);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', '#4a90e2');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    
    const dx = connection.targetPosX - connection.sourcePosX;
    const controlPointOffset = Math.min(Math.abs(dx) * 0.5, 150);
    const pathData = `M ${connection.sourcePosX} ${connection.sourcePosY} 
                      C ${connection.sourcePosX + controlPointOffset} ${connection.sourcePosY},
                        ${connection.targetPosX - controlPointOffset} ${connection.targetPosY},
                        ${connection.targetPosX} ${connection.targetPosY}`;
    
    path.setAttribute('d', pathData);
    svg.appendChild(path);
    document.querySelector('.canvas-area')?.appendChild(svg);
  }

  private isValidConnection(sourcePort: IPort, targetPort: HTMLElement): boolean {
    const sourceType = sourcePort.type;
    const targetType = targetPort.getAttribute('data-port-type');
    return sourceType !== targetType;
  }

  deleteWidget(widget: any) {
    const index = this.placedWidgets.indexOf(widget);
    if (index > -1) {
      // Remove any wire connections associated with this widget
      this.wireConnections = this.wireConnections.filter(wire => 
        wire.sourceWidgetId !== widget.id && wire.targetWidgetId !== widget.id
      );
      // Remove the widget
      this.placedWidgets.splice(index, 1);
      this.cdr.detectChanges();
    }
  }

  onMoreClick(event: MouseEvent, widget: any) {
    event.preventDefault();
    event.stopPropagation();
    
    this.selectedWidget = widget;
    this.activeContextMenu = 1;
    this.contextMenuPosition = {
      x: event.clientX,
      y: event.clientY
    } as ContextMenuPosition;
  }

  @HostListener('document:click', ['$event'])
 

  onPortMouseDown(event: MouseEvent, widgetId: string, port: any, isInput: boolean) {
    event.stopPropagation();
    event.preventDefault();
    
    const portElement = event.target as HTMLElement;
    const portRect = portElement.getBoundingClientRect();
    const svgRect = this.svgContainer.nativeElement.getBoundingClientRect();
    
    const startPoint = {
      x: portRect.left - svgRect.left + portRect.width / 2,
      y: portRect.top - svgRect.top + portRect.height / 2
    };
    
    this.isDraggingWire = true;
    this.sourcePort = { widgetId, portId: port.id, isInput };
    this.tempWire = {
      sourceX: startPoint.x,
      sourceY: startPoint.y,
      targetX: startPoint.x,
      targetY: startPoint.y
    };
    
    // Add mousemove event listener
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  onPortMouseUp(event: MouseEvent, widgetId: string, port: any, isInput: boolean) {
    event.stopPropagation();
    const endPort = {
      widgetId,
      portId: port.id,
      isInput
    };
    this.completeWireConnection(endPort);
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (this.isDraggingWire && this.tempWire) {
      const svgRect = this.svgContainer.nativeElement.getBoundingClientRect();
      const mouseX = event.clientX - svgRect.left;
      const mouseY = event.clientY - svgRect.top;
      
      // Add smoothing by interpolating between current and target position
      const smoothingFactor = 0.3;
      this.tempWire.targetX += (mouseX - this.tempWire.targetX) * smoothingFactor;
      this.tempWire.targetY += (mouseY - this.tempWire.targetY) * smoothingFactor;
      
      // Force Angular change detection
      this.cdr.detectChanges();
    }
  }

  private handleMouseUp = (event: MouseEvent) => {
    if (!this.isDraggingWire || !this.sourceWidget) {
      this.resetWireState();
      return;
    }

    // Let onPortMouseUp handle the connection if it's over a port
    const targetElement = document.elementFromPoint(event.clientX, event.clientY);
    if (!targetElement?.closest('.port')) {
      this.resetWireState();
    }
  }

  private resetWireState() {
    this.isDraggingWire = false;
    this.sourcePort = null;
    this.sourceWidget = null;
    this.tempWire = null;
    
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  getTempWirePath(): string {
    if (!this.tempWire) return '';
    
    const dx = this.tempWire.targetX - this.tempWire.sourceX;
    const dy = this.tempWire.targetY - this.tempWire.sourceY;
    const controlPointOffset = Math.min(Math.abs(dx) * 0.5, 150);
    
    return `
      M ${this.tempWire.sourceX} ${this.tempWire.sourceY}
      C ${this.tempWire.sourceX + controlPointOffset} ${this.tempWire.sourceY},
        ${this.tempWire.targetX - controlPointOffset} ${this.tempWire.targetY},
        ${this.tempWire.targetX} ${this.tempWire.targetY}
    `.trim();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.draggingWire) {
      this.updateActiveWire(event);
    }
  }

  private updateActiveWire(event: MouseEvent) {
    if (!this.activeWire) return;
    
    const rect = this.svgContainer.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.mousePosition = { x, y };
    this.drawActiveWire();
  }

  private drawActiveWire() {
    if (!this.activeWire?.sourceNodeId) return;

    const sourceNode = this.placedWidgets.find(w => w.id === this.activeWire?.sourceNodeId);
    if (!sourceNode) return;

    const sourcePort = sourceNode?.outputs.find(p => p.id === this.activeWire?.sourcePortId);
    if (!sourcePort) return;

    const startPoint = this.getPortPosition(sourceNode, sourcePort);
    const endPoint = this.mousePosition;

    this.activeWire.points = this.calculateWirePath(startPoint, endPoint);
  }

  private calculateWirePath(start: { x: number; y: number }, end: { x: number; y: number }) {
    const midX = (start.x + end.x) / 2;
    return [
      start,
      { x: midX, y: start.y },
      { x: midX, y: end.y },
      end
    ];
  }

  private createWire(targetNodeId: string, targetPortId: string) {
    if (!this.activeWire?.sourceNodeId || !this.activeWire?.sourcePortId) return;

    const newWire: IWire = {
      id: `wire-${Date.now()}`,
      sourceNodeId: this.activeWire.sourceNodeId,
      sourcePortId: this.activeWire.sourcePortId,
      targetNodeId,
      targetPortId,
      points: this.activeWire.points || []
    };

    this.wires.push(newWire);
  }

  private resetWireCreation() {
    this.draggingWire = false;
    this.activeWire = null;
  }

  private getPortPosition(widget: IPlacedWidget, port: IPort): { x: number; y: number } {
    // Get the widget element to calculate actual position
    const widgetElement = document.querySelector(`[data-widget-id="${widget.id}"]`);
    const portElement = widgetElement?.querySelector(`[data-port-id="${port.id}"]`);
    
    if (widgetElement && portElement) {
      const widgetRect = widgetElement.getBoundingClientRect();
      const portRect = portElement.getBoundingClientRect();
      const svgRect = this.svgContainer.nativeElement.getBoundingClientRect();
      
      return {
        x: portRect.left - svgRect.left + portRect.width / 2,
        y: portRect.top - svgRect.top + portRect.height / 2
      };
    }
    
    // Fallback to calculated position if elements not found
    const portOffset = 6;
    return {
      x: widget.position.x + (port.position === 'left' ? 0 : widget.width ?? 120),
      y: widget.position.y + ((widget.height ?? 40) / 2)
    };
  }

  // Add this method to generate the SVG path for wires
  getWirePath(wire: IWireConnection): string {
    const sourceWidget = this.placedWidgets.find(w => w.id === wire.sourceWidgetId);
    const targetWidget = this.placedWidgets.find(w => w.id === wire.targetWidgetId);
    
    if (!sourceWidget || !targetWidget) return '';
    
    const sourcePort = sourceWidget.outputs.find(p => p.id === wire.sourcePortId);
    const targetPort = targetWidget.inputs.find(p => p.id === wire.targetPortId);
    
    if (!sourcePort || !targetPort) return '';
    
    const start = this.getPortPosition(sourceWidget, sourcePort);
    const end = this.getPortPosition(targetWidget, targetPort);
    
    // Calculate control points for the curve
    const dx = end.x - start.x;
    const controlPointOffset = Math.min(Math.abs(dx) * 0.5, 150);
    
    return `M ${start.x} ${start.y} 
            C ${start.x + controlPointOffset} ${start.y},
              ${end.x - controlPointOffset} ${end.y},
              ${end.x} ${end.y}`;
  }

  // Add this method for the active wire being drawn
  getActiveWirePath(): string {
    if (!this.activeWire) return '';

    const sourceNode = this.placedWidgets.find(w => w.id === this.activeWire?.sourceNodeId);
    if (!sourceNode) return '';

    const sourcePort = sourceNode.outputs.find(p => p.id === this.activeWire?.sourcePortId);
    if (!sourcePort) return '';

    const sourcePos = {
      x: sourceNode.position.x + 200, // Adjust based on your node width
      y: sourceNode.position.y + 30   // Adjust based on port position
    };

    const controlPoint1X = sourcePos.x + 50;
    const controlPoint2X = this.mousePosition.x - 50;

    return `M ${sourcePos.x} ${sourcePos.y} 
            C ${controlPoint1X} ${sourcePos.y},
              ${controlPoint2X} ${this.mousePosition.y},
              ${this.mousePosition.x} ${this.mousePosition.y}`;
  }

  // Add unique IDs when creating new widgets
  addWidget(widget: any, position: { x: number, y: number }) {
    const newWidget: IPlacedWidget = {
      image: widget.image,
      name: widget.name,
      x: position.x,
      y: position.y,
      id: `node-${Date.now()}`,
      type: widget.type,
      position: position,
      inputs: widget.inputs.map((input: any) => ({
        ...input,
        id: `input-${Date.now()}-${Math.random()}`
      })),
      outputs: widget.outputs.map((output: any) => ({
        ...output,
        id: `output-${Date.now()}-${Math.random()}`
      })),
      isActive: false,
      width: 120,
      height: 120
    };

    this.placedWidgets.push(newWidget);
  }

  runNode(widget: IPlacedWidget) {
    widget.isActive = true;
    this.processWidget(widget);
    
    // Add to selectedWidgets if not already present
    if (!this.selectedWidgets.find(w => w.id === widget.id)) {
      this.selectedWidgets.push(widget);
    }
    
    this.setActiveTab('selected');
    this.cdr.detectChanges();
  }

  runAllNodes() {
    this.selectedWidgets = [...this.placedWidgets];
    this.isMultiSelect = true;
    
    this.placedWidgets.forEach(widget => {
      this.runNode(widget);
    });
    
    this.setActiveTab('selected');
  }

  toggleWidget(widget: IPlacedWidget) {
    widget.isActive = !widget.isActive;
    if (widget.isActive) {
      this.processWidget(widget);
    }
  }

  processWidget(widget: IPlacedWidget) {
    if (!widget.isActive) return;

    let outputValue: any;
    
    switch (widget.name) {
      case 'Text':
        outputValue = `Text Input ${Math.floor(Math.random() * 1000)}`;
        break;
      case 'Web Extractor':
        outputValue = `Web Content ${Math.floor(Math.random() * 1000)}`;
        break;
      case 'Document-to-Text':
        outputValue = `Document Text ${Math.floor(Math.random() * 1000)}`;
        break;
      case 'Google Search':
        outputValue = `Search Result ${Math.floor(Math.random() * 1000)}`;
        break;
      case 'HTTP Get':
        outputValue = `API Response ${Math.floor(Math.random() * 1000)}`;
        break;
      case 'File Upload':
        outputValue = `File Data ${Math.floor(Math.random() * 1000)}`;
        break;
      default:
        outputValue = `Output ${Math.floor(Math.random() * 1000)}`;
    }

    // Store the output
    this.widgetOutputs.unshift({
      widgetId: widget.id,
      widgetName: widget.name,
      value: outputValue,
      timestamp: new Date()
    });

    // Limit stored outputs to last 100
    if (this.widgetOutputs.length > 100) {
      this.widgetOutputs = this.widgetOutputs.slice(0, 100);
    }

    // Update output ports with values and messages
    widget.outputs.forEach(port => {
      port.value = outputValue;
      port.message = `Output: ${outputValue}`;
    });

    // Automatically switch to outputs tab when running a node
    this.setActiveTab('outputs');

    // Find and update connected wires and target widgets
    const connections = this.wireConnections.filter(w => w.sourceWidgetId === widget.id);
    connections.forEach(conn => {
      conn.value = outputValue;
      
      const targetWidget = this.placedWidgets.find(w => w.id === conn.targetWidgetId);
      if (targetWidget) {
        const targetPort = targetWidget.inputs.find(p => p.id === conn.targetPortId);
        if (targetPort) {
          targetPort.value = outputValue;
          targetPort.message = `Input: ${outputValue}`;
          // Process the target widget to propagate the value
          this.processWidget(targetWidget);
        }
      }
    });

    this.cdr.detectChanges();
  }

  createWireConnection(targetWidgetId: string, targetPortId: string) {
    if (!this.activeConnection) return;
    
    const connection: IWireConnection = {
      id: `wire-${Date.now()}`,
      sourceWidgetId: this.activeConnection.sourceWidgetId,
      sourcePortId: this.activeConnection.sourcePortId,
      targetWidgetId: targetWidgetId,
      targetPortId: targetPortId
    };
    
    this.wireConnections.push(connection);
  }

  showWidgetMenu(event: MouseEvent, widget: IPlacedWidget) {
    event.preventDefault();
    event.stopPropagation();
    
    this.selectedWidget = widget;
    this.contextMenuPosition = {
      x: event.clientX,
      y: event.clientY
    };
    this.activeContextMenu = 1;
  }

 

  private updateWireConnections() {
    // Force Angular change detection by creating a new array reference
    this.wireConnections = [...this.wireConnections];
  }

  onDragMoved(event: CdkDragMove<any>) {
    if (!event.source.data) return;
    
    const widget = event.source.data;
    const canvasRect = this.svgContainer.nativeElement.getBoundingClientRect();
    
    // Throttle updates using requestAnimationFrame for smoother motion
    requestAnimationFrame(() => {
      // Calculate position with slight smoothing
      const targetX = event.pointerPosition.x - canvasRect.left;
      const targetY = event.pointerPosition.y - canvasRect.top;
      
      // Apply smooth transition (0.6 is the smoothing factor, adjust if needed)
      const smoothX = widget.position.x + (targetX - widget.position.x) * 0.6;
      const smoothY = widget.position.y + (targetY - widget.position.y) * 0.6;
      
      widget.position = { x: smoothX, y: smoothY };
      widget.x = smoothX;
      widget.y = smoothY;
      
      // Prevent default behavior
      event.source._dragRef.reset();
      
      this.cdr.detectChanges();
    });
  }

  private updateWirePositions(widget: IPlacedWidget) {
    // Update wires where this widget is either source or target
    this.wireConnections = this.wireConnections.map(wire => {
      if (wire.sourceWidgetId === widget.id || wire.targetWidgetId === widget.id) {
        return { ...wire };  // Create new reference to trigger change detection
      }
      return wire;
    });
  }

  openWidget() {
    this.activeContextMenu = null;
  }

  testStep() {
    this.activeContextMenu = null;
  }

  renameWidget() {
    this.activeContextMenu = null;
  }

  pinWidget() {
    this.activeContextMenu = null;
  }

  copyWidget() {
    this.activeContextMenu = null;
  }

  selectAll() {
    this.activeContextMenu = null;
  }

  clearSelection() {
    this.activeContextMenu = null;
  }

  toggleRightSidebar() {
    this.isRightSidebarExpanded = !this.isRightSidebarExpanded;
  }

  setActiveTab(tab: 'data' | 'outputs' | 'selected' | 'api') {
    this.activeTab = tab;
    
    // Handle specific tab actions
    switch (tab) {
      case 'selected':
        // Update selected widget info if none is selected
        if (!this.selectedWidget && this.placedWidgets.length > 0) {
          this.selectedWidget = this.placedWidgets[0];
        }
        break;
      case 'outputs':
        // Refresh outputs if needed
        this.cdr.detectChanges();
        break;
      // Add other cases as needed
    }
  }

  onMenuItemClick(menuItem: any) {
    menuItem.action();
  }

  handleModelClick() {
    // Close other expanded sections
    this.isInputExpanded = false;
    this.isIntegrationExpanded = false;
    this.menuItems.forEach(item => {
      if (item.name !== 'Models') {
        item.isExpanded = false;
      }
    });
    this.cdr.detectChanges();
  }

  handleToolsClick() {
    // Close other expanded sections
    this.isInputExpanded = false;
    this.isIntegrationExpanded = false;
    this.menuItems.forEach(item => {
      if (item.name !== 'Tools') {
        item.isExpanded = false;
      }
    });
    this.cdr.detectChanges();
  }

  handleAPIBuilderClick() {
    // Close other expanded sections
    this.isInputExpanded = false;
    this.isIntegrationExpanded = false;
    this.menuItems.forEach(item => {
      if (item.name !== 'API Builder') {
        item.isExpanded = false;
      }
    });
    this.cdr.detectChanges();
  }

  handleIntegrationsClick() {
    // Implement integrations click functionality
  }

  toggleInput() {
    // Close other menus before opening this one
    if (!this.isInputExpanded) {
      this.closeAllMenus();
    }
    this.isInputExpanded = !this.isInputExpanded;
    this.cdr.detectChanges(); // Ensure view updates
  }

  toggleOutput() {
    if (!this.isOutputExpanded) {
      this.closeAllMenus();
    }
    this.isOutputExpanded = !this.isOutputExpanded;
  }

  toggleTools() {
    if (!this.isToolsExpanded) {
      this.closeAllMenus();
    }
    this.isToolsExpanded = !this.isToolsExpanded;
  }

  toggleViews() {
    if (!this.isViewsExpanded) {
      this.closeAllMenus();
    }
    this.isViewsExpanded = !this.isViewsExpanded;
  }

  toggleApiBuilder() {
    if (!this.isApiBuilderExpanded) {
      this.closeAllMenus();
    }
    this.isApiBuilderExpanded = !this.isApiBuilderExpanded;
  }

  toggleIntegration() {
    if (!this.isIntegrationExpanded) {
      this.closeAllMenus();
    }
    this.isIntegrationExpanded = !this.isIntegrationExpanded;
  }

  onNativeDragStart(event: DragEvent, item: any) {
    if (event.dataTransfer) {
      const widgetData: IPlacedWidget = {
        id: `widget_${Date.now()}`,
        name: item.name,
        image: item.image || '',
        type: item.type,
        x: 0,
        y: 0,
        position: { x: 0, y: 0 },
        inputs: [...(item.inputs || [])],
        outputs: [...(item.outputs || [])],
        isActive: false,
        width: item.width || 120,
        height: item.height || 40,
        borderColor: item.borderColor,
        displayText: item.displayText
      };
      
      // Create invisible drag image
      const dragImage = new Image();
      dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      event.dataTransfer.setDragImage(dragImage, 0, 0);
      
      event.dataTransfer.setData('application/json', JSON.stringify(widgetData));
      const originalElement = event.target as HTMLElement;
      originalElement.classList.add('dragging');
    }
  }

  onNativeDragEnd(event: DragEvent, item: any) {
    // Remove dragging class
    const element = event.target as HTMLElement;
    element.classList.remove('dragging');
    
    // Clean up the drag image
    if (this.dragImage && this.dragImage.parentNode) {
      this.dragImage.parentNode.removeChild(this.dragImage);
      this.dragImage = null;
    }
  }

  private completeWireConnection(endPort: any) {
    if (!this.isDraggingWire || !this.sourcePort) {
      this.resetWireState();
      return;
    }

    // Check if connection is valid (input to output or output to input)
    if (this.sourcePort.isInput === endPort.isInput) {
      this.resetWireState();
      return;
    }

    // Determine source and target based on port types
    const [sourceWidgetId, sourcePortId, targetWidgetId, targetPortId] = 
      this.sourcePort.isInput 
        ? [endPort.widgetId, endPort.portId, this.sourcePort.widgetId, this.sourcePort.portId]
        : [this.sourcePort.widgetId, this.sourcePort.portId, endPort.widgetId, endPort.portId];

    // Create the wire connection
    const connection: IWireConnection = {
      id: `wire-${Date.now()}`,
      sourceWidgetId,
      sourcePortId,
      targetWidgetId,
      targetPortId
    };

    this.wireConnections.push(connection);
    this.resetWireState();
  }

  onDragStarted(event: CdkDragStart) {
    const element = event.source.element.nativeElement;
    element.style.zIndex = '1000';
  }

  // Add method to clear outputs
  clearOutputs() {
    this.widgetOutputs = [];
    this.cdr.detectChanges();
  }

  // Add method to handle widget selection
  selectWidget(widget: IPlacedWidget) {
    this.selectedWidgets = [widget];
    this.isMultiSelect = false;
    this.setActiveTab('selected');
  }

  // Add this method to handle widget drag start
  onWidgetDragStart(event: DragEvent, widget: any) {
    if (event.dataTransfer) {
      const widgetData: IPlacedWidget = {
        id: `widget_${Date.now()}`,
        name: widget.name,
        image: widget.image,
        type: widget.type,
        x: 0,
        y: 0,
        position: { x: 0, y: 0 },
        inputs: [...widget.inputs],
        outputs: [...widget.outputs],
        isActive: false,
        width: widget.width,
        height: widget.height,
        borderColor: widget.borderColor,
        displayText: widget.displayText
      };
      
      // Create and style the drag image
      const dragImage = (event.target as HTMLElement).cloneNode(true) as HTMLElement;
      dragImage.style.width = '120px';
      dragImage.style.height = '40px';
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      dragImage.style.opacity = '0.6';
      dragImage.style.backgroundColor = 'white';
      dragImage.style.border = '1px solid #ccc';
      dragImage.style.borderRadius = '4px';
      dragImage.style.padding = '8px';
      dragImage.style.pointerEvents = 'none';
      
      document.body.appendChild(dragImage);
      event.dataTransfer.setDragImage(dragImage, 60, 20);
      this.dragImage = dragImage;
      
      event.dataTransfer.setData('application/json', JSON.stringify(widgetData));
      (event.target as HTMLElement).classList.add('dragging');
    }
  }

  // Add this method to handle widget drag end
  onWidgetDragEnd(event: DragEvent) {
    const element = event.target as HTMLElement;
    element.classList.remove('dragging');
    
    if (this.dragImage && this.dragImage.parentNode) {
      this.dragImage.parentNode.removeChild(this.dragImage);
      this.dragImage = null;
    }
  }

  // Add method to close all menus
  private closeAllMenus() {
    this.isInputExpanded = false;
    this.isOutputExpanded = false;
    this.isToolsExpanded = false;
    this.isViewsExpanded = false;
    this.isApiBuilderExpanded = false;
    this.isIntegrationExpanded = false;
    this.isModelsExpanded = false;
  }

  toggleModels() {
    if (!this.isModelsExpanded) {
      this.closeAllMenus();
    }
    this.isModelsExpanded = !this.isModelsExpanded;
    this.cdr.detectChanges();
  }

  // Generic function to handle widget placement for any type of widget
  placeWidgetRandomly(widget: any) {
    const canvasWidth = window.innerWidth - 500; // Adjust based on your canvas width
    const canvasHeight = window.innerHeight; // Adjust based on your canvas height
    
    const randomX = Math.floor(Math.random() * (canvasWidth - 120)); // 120 is default widget width
    const randomY = Math.floor(Math.random() * (canvasHeight - 40)); // 40 is default widget height

    const placedWidget: IPlacedWidget = {
      ...widget,
      id: `${widget.name}_${Date.now()}`, // Ensure unique ID
      x: randomX,
      y: randomY,
      position: { x: randomX, y: randomY },
      isActive: false,
      width: widget.width || 120,
      height: widget.height || 40
    };

    this.placedWidgets.push(placedWidget);
    this.cdr.detectChanges();
  }

  // Update click handlers for all menu items
  onInputItemClick(item: any) {
    this.placeWidgetRandomly(item);
  }

  onOutputItemClick(item: any) {
    this.placeWidgetRandomly(item);
  }

  onToolItemClick(item: any) {
    this.placeWidgetRandomly(item);
  }

  onModelItemClick(item: any) {
    this.placeWidgetRandomly(item);
  }

  onViewItemClick(item: any) {
    this.placeWidgetRandomly(item);
  }

  onApiBuilderItemClick(item: any) {
    this.placeWidgetRandomly(item);
  }

  onIntegrationItemClick(item: any) {
    this.placeWidgetRandomly(item);
  }

  // Add these methods
  openPromptDialog() {
    this.showPromptDialog = true;
  }

  closePromptDialog() {
    this.showPromptDialog = false;
    this.promptText = '';
  }

  submitPrompt() {
    // Handle the prompt text here
    console.log('Prompt submitted:', this.promptText);
    this.closePromptDialog();
  }

  // Update your existing context menu click handler to include:
  onContextMenuItemClick(action: string) {
    if (action === 'prompt') {
      this.openPromptDialog();
    }
    // ... other cases
  }

  activateWidget() {
    if (this.selectedWidget) {
      // Set widget to active state
      this.selectedWidget.isActive = true;
      
      // Remove deactivated class if present
      const widgetElement = document.querySelector(`[data-widget-id="${this.selectedWidget.id}"]`);
      if (widgetElement) {
        widgetElement.classList.remove('deactivated');
      }

      // Run the node (same as run button)
      this.runNode(this.selectedWidget);
      
      // Close context menu
      this.activeContextMenu = null;
      
      this.showNotification(`Widget ${this.selectedWidget.name} activated and running`);
      this.cdr.detectChanges();
    }
  }

  deleteSelectedWidget() {
    if (this.selectedWidget) {
      // Remove widget from placedWidgets array
      const index = this.placedWidgets.findIndex(w => w.id === this.selectedWidget.id);
      if (index !== -1) {
        this.placedWidgets.splice(index, 1);
        
        // Remove any associated wire connections
        this.wireConnections = this.wireConnections.filter(wire => 
          wire.sourceWidgetId !== this.selectedWidget.id && 
          wire.targetWidgetId !== this.selectedWidget.id
        );
        
        // Clear selection
        this.selectedWidget = null;
        // Close context menu
        this.activeContextMenu = null;
        // Optional: Add visual feedback
        this.showNotification('Widget deleted');
      }
    }
  }

  // Optional: Add a notification system
  private showNotification(message: string) {
    // You can implement this using your preferred notification system
    console.log(message);
  }

  deactivateWidget(widget?: IPlacedWidget) {
    const targetWidget = widget || this.selectedWidget;
    if (targetWidget) {
      // Set widget to inactive state
      targetWidget.isActive = false;
      
      // Clear this widget's input/output values
      if (targetWidget.inputs) {
        targetWidget.inputs.forEach((input: IPort) => {
          input.value = null;
          input.message = '';
        });
      }
      
      if (targetWidget.outputs) {
        targetWidget.outputs.forEach((output: IPort) => {
          output.value = null;
          output.message = '';
        });
      }

      // Find and clear connected widgets' values
      this.wireConnections
        .filter(wire => 
          wire.sourceWidgetId === targetWidget.id || 
          wire.targetWidgetId === targetWidget.id
        )
        .forEach(wire => {
          // Clear source widget outputs
          const sourceWidget = this.placedWidgets.find(w => w.id === wire.sourceWidgetId);
          if (sourceWidget) {
            const sourcePort = sourceWidget.outputs.find(p => p.id === wire.sourcePortId);
            if (sourcePort) {
              sourcePort.value = null;
              sourcePort.message = '';
            }
          }

          // Clear target widget inputs
          const targetConnectedWidget = this.placedWidgets.find(w => w.id === wire.targetWidgetId);
          if (targetConnectedWidget) {
            const targetPort = targetConnectedWidget.inputs.find(p => p.id === wire.targetPortId);
            if (targetPort) {
              targetPort.value = null;
              targetPort.message = '';
            }
          }
        });

      // Add visual feedback
      const widgetElement = document.querySelector(`[data-widget-id="${targetWidget.id}"]`);
      if (widgetElement) {
        widgetElement.classList.add('deactivated');
      }

      if (!widget) {
        this.activeContextMenu = null;
      }
      
      this.showNotification(`Widget ${targetWidget.name} deactivated`);
      this.cdr.detectChanges();
    }
  }

  showWireDeleteButton(wire: IWireConnection) {
    wire.isHovered = true;
    this.cdr.detectChanges();
  }

  hideWireDeleteButton(wire: IWireConnection) {
    wire.isHovered = false;
    this.cdr.detectChanges();
  }

  getWireDeleteButtonPosition(wire: IWireConnection): string {
    const sourceWidget = this.placedWidgets.find(w => w.id === wire.sourceWidgetId);
    const targetWidget = this.placedWidgets.find(w => w.id === wire.targetWidgetId);
    
    if (!sourceWidget || !targetWidget) return '';
    
    const sourcePort = sourceWidget.outputs.find(p => p.id === wire.sourcePortId);
    const targetPort = targetWidget.inputs.find(p => p.id === wire.targetPortId);
    
    if (!sourcePort || !targetPort) return '';
    
    // Get start and end points
    const start = this.getPortPosition(sourceWidget, sourcePort);
    const end = this.getPortPosition(targetWidget, targetPort);
    
    // Calculate midpoint of the wire
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    
    // Position directly over the wire
    return `translate(${midX}, ${midY})`;
  }

  deleteWireConnection(wire: IWireConnection) {
    console.log('Deleting wire:', wire); // Debug log
    
    // Find the wire index
    const index = this.wireConnections.findIndex(w => 
      w.id === wire.id && 
      w.sourceWidgetId === wire.sourceWidgetId && 
      w.targetWidgetId === wire.targetWidgetId
    );
    
    if (index > -1) {
      // Remove the wire
      this.wireConnections.splice(index, 1);
      
      // Clear any associated port values if needed
      const sourceWidget = this.placedWidgets.find(w => w.id === wire.sourceWidgetId);
      const targetWidget = this.placedWidgets.find(w => w.id === wire.targetWidgetId);
      
      if (sourceWidget) {
        const sourcePort = sourceWidget.outputs.find(p => p.id === wire.sourcePortId);
        if (sourcePort) {
          sourcePort.value = null;
        }
      }
      
      if (targetWidget) {
        const targetPort = targetWidget.inputs.find(p => p.id === wire.targetPortId);
        if (targetPort) {
          targetPort.value = null;
        }
      }
      
      // Force view update
      this.cdr.detectChanges();
    }
  }

  keepWireDeleteButton(wire: IWireConnection) {
    wire.isHovered = true;
    this.cdr.detectChanges();
  }

  handleWireMouseLeave(event: MouseEvent, wire: IWireConnection) {
    // Get the delete button element
    const deleteBtn = (event.target as Element)
      .parentElement!
      .querySelector('.wire-delete-btn');
    
    // Check if the mouse is moving towards the delete button
    if (deleteBtn) {
      const deleteBtnRect = (deleteBtn as SVGGElement)
        .getBoundingClientRect();
      
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      
      // Calculate if mouse is moving towards the delete button
      const movingTowardsBtn = 
        mouseX >= deleteBtnRect.left - 10 && 
        mouseX <= deleteBtnRect.right + 10 &&
        mouseY >= deleteBtnRect.top - 10 && 
        mouseY <= deleteBtnRect.bottom + 10;
      
      if (!movingTowardsBtn) {
        this.hideWireDeleteButton(wire);
      }
    }
  }
}
