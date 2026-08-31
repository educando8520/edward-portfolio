// Centralized content data for the portfolio.

export const profile = {
  name: 'Edward Antonio Benavides Trujillo',
  shortName: 'Edward Benavides',
  role: 'Network & Telecommunications Engineer',
  university: 'Pontificia Universidad Javeriana',
  location: 'Bogotá, Colombia',
  focus: 'Cloud Computing + Network Engineering',
  tagline: 'Building the infrastructure that connects the digital world.',
  rotating: [
    'Cloud Computing',
    'Network Engineering',
    'RF & Wireless Systems',
    'Cloud Architecture',
    'Telecommunications',
    'Technology',
  ],
}

export const navLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'cloud' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'tech' },
  { label: 'Contact', id: 'contact' },
]

export const aboutMetrics = [
  { value: '8+', label: 'Focus Domains' },
  { value: '4.0', label: 'Academic Track' },
  { value: '2.4', label: 'GHz RF Project', suffix: 'GHz' },
  { value: '∞', label: 'Curiosity' },
]

export const aboutFocus = [
  'Cloud Computing',
  'Networking',
  'Telecommunications',
  'Wireless Systems',
  'RF Engineering',
  'Cloud Architecture',
  'Infrastructure',
  'Automation',
  'Artificial Intelligence',
]

export const aboutGoals = [
  'Cloud Engineer',
  'Network Engineer',
  'Cloud Architect',
  'Solutions Architect',
]

export const aboutLayers = [
  { k: 'Hardware', desc: 'Physical substrates & RF front-ends' },
  { k: 'Networks', desc: 'Routing, switching, packet flow' },
  { k: 'Radiofrequency', desc: 'Antennas, propagation, matching' },
  { k: 'Infrastructure', desc: 'Compute, storage, virtualization' },
  { k: 'Cloud', desc: 'ECS, VPC, containers, native services' },
  { k: 'Software', desc: 'Python, MATLAB, automation' },
  { k: 'Distributed', desc: 'Services across boundaries' },
]

export const cloudLayers = [
  { id: 'internet', label: 'Internet', icon: 'Globe', desc: 'Public ingress & DNS resolution' },
  { id: 'lb', label: 'Load Balancer', icon: 'Split', desc: 'Traffic distribution & health checks' },
  { id: 'vpc', label: 'Virtual Private Cloud', icon: 'Shield', desc: 'Isolated network, subnets, route tables' },
  { id: 'compute', label: 'Elastic Cloud Server', icon: 'Server', desc: 'ECS compute instances & EIP' },
  { id: 'containers', label: 'CCE / Kubernetes', icon: 'Boxes', desc: 'Cloud Container Engine, Docker, pods' },
  { id: 'db', label: 'Relational Database', icon: 'Database', desc: 'RDS managed data layer' },
  { id: 'storage', label: 'Object & Block Storage', icon: 'HardDrive', desc: 'OBS buckets & EVS volumes' },
]

export const cloudSkills = [
  'Huawei Cloud', 'ECS', 'VPC', 'Elastic IP', 'NAT Gateway', 'OBS',
  'EVS', 'RDS', 'CCE', 'Kubernetes', 'Docker', 'Linux',
  'Cloud Security', 'Distributed Systems', 'Cloud Native',
]

export const networkNodes = [
  { id: 'router', label: 'Router', x: 50, y: 18, icon: 'Router' },
  { id: 'firewall', label: 'Firewall', x: 22, y: 40, icon: 'Shield' },
  { id: 'switch', label: 'Switch', x: 78, y: 40, icon: 'Network' },
  { id: 'cloud', label: 'Cloud', x: 50, y: 58, icon: 'Cloud' },
  { id: 'server', label: 'Server', x: 30, y: 82, icon: 'Server' },
  { id: 'client', label: 'Client', x: 70, y: 82, icon: 'Monitor' },
]

export const networkEdges = [
  ['router', 'firewall'],
  ['router', 'switch'],
  ['firewall', 'cloud'],
  ['switch', 'cloud'],
  ['cloud', 'server'],
  ['cloud', 'client'],
  ['server', 'client'],
]

export const networkSkills = [
  'TCP/IP', 'Routing', 'Switching', 'VLAN', 'Subnetting', 'CIDR',
  'Security Groups', 'ACLs', 'NAT', 'VPC', 'Packet Analysis', 'Troubleshooting',
]

export const networkTools = ['Cisco Packet Tracer', 'GNS3', 'Wireshark', 'Linux']

export const rfSpecs = [
  { k: 'Center Frequency', v: '2.45 GHz' },
  { k: 'Band', v: '2.4 GHz ISM' },
  { k: 'Array', v: '4 × 2 Patch' },
  { k: 'Type', v: 'Microstrip Sector' },
  { k: 'Target', v: 'Drone Detection' },
  { k: 'Simulator', v: 'ANSYS HFSS' },
]

export const rfComponents = [
  'Microstrip Antenna Design',
  '4×2 Patch Array',
  'RF Feed Network',
  'Impedance Matching',
  'Quarter-Wave Transformers',
  'Power Distribution Network',
  'Radiation Pattern Analysis',
  'S-Parameters',
  'HFSS Simulation',
  'ANSYS Electronics Desktop',
  'MATLAB',
  'Sectorization Analysis',
]

export const techStack = [
  {
    cat: 'Cloud',
    color: '#3b82f6',
    items: ['Huawei Cloud', 'Cloud Infrastructure', 'Cloud Native', 'Kubernetes', 'Containers'],
  },
  {
    cat: 'Networking',
    color: '#22d3ee',
    items: ['Cisco', 'TCP/IP', 'Routing', 'Switching', 'Wireshark', 'GNS3', 'Packet Tracer'],
  },
  {
    cat: 'RF & Telecom',
    color: '#8b5cf6',
    items: ['ANSYS HFSS', 'ANSYS Electronics Desktop', 'Microstrip', 'Antenna Arrays', 'RF Simulation'],
  },
  {
    cat: 'Programming',
    color: '#60a5fa',
    items: ['Python', 'MATLAB'],
  },
  {
    cat: 'Systems',
    color: '#67e8f9',
    items: ['Linux'],
  },
  {
    cat: 'Other',
    color: '#a78bfa',
    items: ['Git', 'GitHub'],
  },
]

export const projects = [
  {
    name: '2.4 GHz Sector Antenna',
    category: 'RF Engineering',
    tech: ['HFSS', 'MATLAB', 'Microstrip'],
    desc: 'Design, simulation & analysis of a passive sector antenna for drone signal detection in the 2.4 GHz band.',
    featured: true,
    status: 'detailed',
  },
  {
    name: 'Cloud Architecture Labs',
    category: 'Cloud',
    tech: ['Huawei Cloud', 'VPC', 'ECS', 'Kubernetes'],
    desc: 'Hands-on cloud infrastructure design: VPCs, load balancing, container orchestration and native services.',
    status: 'structured',
  },
  {
    name: 'Network Infrastructure Labs',
    category: 'Networking',
    tech: ['Cisco', 'TCP/IP', 'VLAN', 'Routing'],
    desc: 'Routing, switching, subnetting and security policies across simulated enterprise topologies.',
    status: 'structured',
  },
  {
    name: 'Kubernetes & Cloud Native Labs',
    category: 'Cloud Native',
    tech: ['Kubernetes', 'Docker', 'CCE'],
    desc: 'Container orchestration, deployments and cloud-native patterns on managed container engines.',
    status: 'structured',
  },
  {
    name: 'Packet Analysis with Wireshark',
    category: 'Networking',
    tech: ['Wireshark', 'TCP/IP', 'Linux'],
    desc: 'Dissection and troubleshooting of real traffic flows, latency and protocol behavior.',
    status: 'structured',
  },
  {
    name: 'Network Simulations with GNS3',
    category: 'Networking',
    tech: ['GNS3', 'Cisco', 'Routing'],
    desc: 'Virtualized network labs for complex routing protocols and topology validation.',
    status: 'structured',
  },
]

export const timeline = [
  { phase: 'Foundation', title: 'Engineering Studies', desc: 'Redes y Telecomunicaciones — Pontificia Universidad Javeriana.', tag: 'Academia' },
  { phase: 'Core', title: 'Networking Foundations', desc: 'TCP/IP, routing, switching, VLANs and subnetting mastery.', tag: 'Networks' },
  { phase: 'Core', title: 'Telecommunications', desc: 'Signal theory, propagation and wireless system principles.', tag: 'Telecom' },
  { phase: 'Advanced', title: 'RF Systems', desc: 'Antenna design, microstrip arrays and HFSS simulation.', tag: 'RF' },
  { phase: 'Cloud', title: 'Cloud Computing', desc: 'Infrastructure as a service, virtualization and cloud native concepts.', tag: 'Cloud' },
  { phase: 'Cloud', title: 'Huawei Cloud', desc: 'ECS, VPC, containers and managed services within the Huawei ecosystem.', tag: 'Huawei' },
  { phase: 'Cloud', title: 'Advanced Cloud Architecture', desc: 'Distributed, secure and scalable cloud-native architectures.', tag: 'Architecture' },
  { phase: 'Future', title: 'Cloud Architect / Solutions Architect', desc: 'Evolving toward leadership in cloud & network solutions.', tag: 'Next' },
]

export const terminalLines = [
  { cmd: 'whoami', out: 'Edward Antonio Benavides Trujillo' },
  { cmd: 'specialization', out: 'Networks | Cloud | Telecommunications | RF' },
  { cmd: 'current_focus', out: 'Cloud Computing + Network Engineering' },
  { cmd: 'location', out: 'Bogotá, Colombia' },
  { cmd: 'status', out: 'Building.' },
]

export const contactLinks = [
  { label: 'LinkedIn', icon: 'Linkedin', href: 'https://www.linkedin.com/in/PLACEHOLDER', placeholder: true },
  { label: 'GitHub', icon: 'Github', href: 'https://github.com/PLACEHOLDER', placeholder: true },
  { label: 'Email', icon: 'Mail', href: 'mailto:PLACEHOLDER@example.com', placeholder: true },
  { label: 'CV', icon: 'FileText', href: '#', placeholder: true },
]
