module BCE
  module ApiUtil
    def request(opts)
      opts.reverse_merge!(
        method: :get,
        params: {},
        payload: {}
      )
      canonical_payload = opts[:payload].to_json
      time_str = Time.now.utc.strftime('%FT%TZ')
      canonical_headers = {
        'Host' => opts[:host],
        'Content-Length' => canonical_payload.size,
        'Content-Type' => 'application/json',
        'Content-MD5' => Digest::MD5.hexdigest(canonical_payload),
        'X-Bce-Date' => time_str
      }
      if [:post, :put].include?(opts[:method])
        canonical_headers.merge!('X-Bce-Content-Sha256' => Digest::SHA256.hexdigest(canonical_payload))
      end
      canonical_request = [
        opts[:method].to_s.upcase,
        opts[:url],
        opts[:params].to_a.map do |row|
          ERB::Util.url_encode(row[0].to_s) + '=' + ERB::Util.url_encode(row[1].to_s)
        end.sort.join('&'),
        canonical_headers.to_a.map do |row|
          ERB::Util.url_encode(row[0].downcase.to_s) + ':' + ERB::Util.url_encode(row[1].to_s)
        end.sort.join("\n")
      ].join("\n")
      signed_headers = canonical_headers.keys.map(&:downcase).sort.join(';')
      prefix = "bce-auth-v1/此处放access_key/#{time_str}/1800"
      signing_key = OpenSSL::HMAC.hexdigest('SHA256', '此处放secret_key', prefix)
      signature = OpenSSL::HMAC.hexdigest('SHA256', signing_key, canonical_request)
      request = Typhoeus::Request.new(
        "http://#{opts[:host]}#{opts[:url]}",
        method: opts[:method],
        body: canonical_payload,
        params: opts[:params],
        headers: canonical_headers.merge(
          'Authorization' => "#{prefix}/#{signed_headers}/#{signature}"
        )
      )
      response = request.run
      response.body
    end
  end
end
