# The MIT License (MIT)
#
# Copyright (c) Heath Stewart
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-14

ARG DISPLAY=":1"
ARG USERNAME="node"

ENV DISPLAY="${DISPLAY}" \
    EDITOR="nano" \
    LANG="en_US.UTF-8" \
    OPENSSL_CONF="/etc/ssl" \
    VISUAL="nano"

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
        libasound2 \
        libgbm1 \
        libgtk-3-0 \
        libnss3 \
        libsecret-1-dev \
        libxss1 \
        x11-utils \
        x11-xserver-utils \
        xvfb \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

COPY bin/init.sh /usr/local/share/

RUN chmod +x /usr/local/share/init.sh

ENTRYPOINT ["/usr/local/share/init.sh"]
CMD ["sleep", "infinity"]
