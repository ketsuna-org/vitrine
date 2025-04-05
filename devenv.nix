{ pkgs, lib, config, inputs, ... }:

{
  packages = [
    pkgs.git
    pkgs.nodejs
     ];


  languages.ruby.enable = true;

  enterShell = ''
    git --version
    bundle install
    npm ci
  '';

  tasks = {
    "c:watch".exec = "bundle exec jekyll serve --livereload";
  };

}
