Gem::Specification.new do |spec|
  spec.name          = "os-widgets"
  spec.version       = "0.1.0"
  spec.authors       = ["Roy Johnson"]
  spec.email         = ["roy.e.johnson@rice.edu"]

  spec.summary       = %q{OpenStax custom widgets}
  spec.description   = %q{Like the pattern library, but for functionality}
  spec.homepage      = "https://github.com/openstax/os-widgets/"
  spec.license       = "AGPL-3.0"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files         = 'src/os-multi-select-global.js'
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.17"
  spec.add_development_dependency "rake", "~> 10.0"
end
