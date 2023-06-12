load('ext://namespace', 'namespace_create', 'namespace_inject')

config.define_bool("run-cypress")
cfg = config.parse()
run_cypress = cfg.get("run-cypress", False)

development_namespace='moodie-development'

namespace_create(development_namespace)

# Create external resources
k8s_yaml(namespace_inject(read_file('.development/cassandra.yml'), development_namespace))

# Create deployment
deployment = namespace_inject(read_file('kustomize/deployment.yml'), development_namespace)
k8s_yaml(deployment)
service = namespace_inject(read_file('kustomize/service.yml'), development_namespace)
k8s_yaml(service)

# Build: tell Tilt what images to build from which directories

docker_build('ghcr.io/leemartin77/moodie', '.')

# Watch: tell Tilt how to connect locally (optional)

k8s_resource('cassandra', port_forwards="9145:9042", labels=["services"])

k8s_resource('moodie', port_forwards="4025:3000", labels=["application"],  resource_deps=['cassandra'],
  auto_init=True,
  trigger_mode=TRIGGER_MODE_MANUAL if run_cypress else TRIGGER_MODE_AUTO)

local_resource('moodie local',
  serve_cmd='npm run dev',
  links=["http://localhost:5173"],
  serve_env={
    'CASSANDRA_CONTACT_POINTS': "localhost:9145",
    'CASSANDRA_USER':'cassandra',
    'CASSANDRA_PASSWORD':'cassandra',
  },
  dir='.',
  auto_init=False,
  trigger_mode=TRIGGER_MODE_MANUAL,
  labels=["application"]
)
