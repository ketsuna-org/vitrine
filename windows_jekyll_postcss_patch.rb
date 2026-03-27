# frozen_string_literal: true

# Windows compatibility patch for jekyll-postcss.
# Upstream invokes Unix scripts directly, which fails on Windows.
return unless Gem.win_platform?

require "open3"
require "jekyll-postcss/socket"

module PostCss
  class Socket
    module WindowsNodeRunner
      def initialize
        @compiled_css = nil
      end

      def write(data)
        payload = JSON.dump(:raw_content => data)
        stdout, stderr, status = Open3.capture3("node", POSTCSS_SCRIPT, payload)

        unless status.success?
          raise "PostCSS failed on Windows: #{stderr.strip}"
        end

        @compiled_css = stdout
        nil
      end

      def read
        raise "You must call PostCss#write before calling PostCss#read" if @compiled_css.nil?

        JSON.parse(@compiled_css).fetch("compiled_css")
      end
    end

    prepend WindowsNodeRunner
  end
end
